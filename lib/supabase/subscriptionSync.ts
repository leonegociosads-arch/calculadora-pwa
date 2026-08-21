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
 * - subscriptions: guarda o status detalhado (histórico/depuração)
 * - profiles.plan: o que o resto do app já usa pra liberar/bloquear recursos
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

  if (!isActive) {
    // Um aviso de cancelamento/pausa só deve derrubar o Premium se for sobre
    // a assinatura que está realmente em vigor agora. Um aviso atrasado
    // sobre uma assinatura antiga (ex: de um clique duplicado) não deve
    // afetar quem já tem uma assinatura diferente e ativa.
    const { data: current, error: fetchError } = await admin
      .from("subscriptions")
      .select("mercadopago_preapproval_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      throw new Error(`Falha ao consultar assinatura atual: ${fetchError.message}`);
    }

    if (current && current.mercadopago_preapproval_id !== preapprovalId) {
      return;
    }
  }

  const plan = isActive ? "premium" : "free";

  const { error: subscriptionError } = await admin.from("subscriptions").upsert({
    user_id: userId,
    mercadopago_preapproval_id: preapprovalId,
    status,
    next_payment_date: nextPaymentDate,
  });

  if (subscriptionError) {
    throw new Error(`Falha ao salvar subscriptions: ${subscriptionError.message}`);
  }

  const { error: profileError } = await admin.from("profiles").update({ plan }).eq("id", userId);

  if (profileError) {
    throw new Error(`Falha ao atualizar profiles.plan: ${profileError.message}`);
  }
}
