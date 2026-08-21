import "server-only";
import { createAdminClient } from "./admin";

const ACTIVE_STATUSES = new Set(["authorized"]);

interface SyncParams {
  userId: string;
  preapprovalId: string;
  status: string;
  nextPaymentDate: string | null;
}

/**
 * Ponto único que decide "esse usuário é Premium ou não" com base no status
 * real da assinatura no Mercado Pago, e aplica isso nas duas tabelas:
 * - subscriptions: guarda o status detalhado + até quando o acesso já foi
 *   pago (current_period_end) — isso é o que sustenta o Premium mesmo
 *   depois de cancelar, até o fim do período já pago.
 * - profiles.plan: um resumo histórico simples, usado só como referência.
 *
 * Só deve ser chamado depois de validar a assinatura do webhook E consultar
 * o estado real da assinatura direto na API do Mercado Pago.
 */
export async function syncUserPlanFromSubscription({
  userId,
  preapprovalId,
  status,
  nextPaymentDate,
}: SyncParams): Promise<void> {
  const admin = createAdminClient();
  const isActive = ACTIVE_STATUSES.has(status);

  const { data: current, error: fetchError } = await admin
    .from("subscriptions")
    .select("mercadopago_preapproval_id, current_period_end")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(`Falha ao consultar assinatura atual: ${fetchError.message}`);
  }

  if (!isActive && current && current.mercadopago_preapproval_id !== preapprovalId) {
    // Aviso de cancelamento/pausa sobre uma assinatura antiga, já
    // substituída por outra mais recente — ignoramos, para não derrubar o
    // acesso de quem já tem uma assinatura diferente e ativa.
    return;
  }

  const upsertPayload: {
    user_id: string;
    mercadopago_preapproval_id: string;
    status: string;
    next_payment_date: string | null;
    current_period_end?: string;
  } = {
    user_id: userId,
    mercadopago_preapproval_id: preapprovalId,
    status,
    next_payment_date: nextPaymentDate,
  };

  if (isActive && nextPaymentDate) {
    // A cada cobrança aprovada, "next_payment_date" também representa até
    // quando o acesso atual já está garantido — mesmo que a pessoa
    // cancele logo em seguida, o acesso continua até essa data.
    upsertPayload.current_period_end = nextPaymentDate;
  }

  const { error: subscriptionError } = await admin
    .from("subscriptions")
    .upsert(upsertPayload);

  if (subscriptionError) {
    throw new Error(`Falha ao salvar subscriptions: ${subscriptionError.message}`);
  }

  const plan = isActive ? "premium" : "free";
  const { error: profileError } = await admin.from("profiles").update({ plan }).eq("id", userId);

  if (profileError) {
    throw new Error(`Falha ao atualizar profiles.plan: ${profileError.message}`);
  }
}
