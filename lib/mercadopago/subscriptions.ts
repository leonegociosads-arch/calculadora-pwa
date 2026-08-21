import "server-only";
import { PreApproval } from "mercadopago";
import { createMercadoPagoClient } from "./client";

const PREMIUM_PRICE_BRL = 9.9;
const PLAN_REASON = "Calculex Premium (mensal)";

interface CreateSubscriptionParams {
  userId: string;
  payerEmail: string;
  backUrl: string;
  notificationUrl: string;
}

interface CreateSubscriptionResult {
  id: string;
  status: string;
  initPoint: string;
}

/**
 * Cria uma assinatura (preapproval) no Mercado Pago para o usuário indicado.
 * Não marca ninguém como Premium — a assinatura nasce com status "pending",
 * só vira "authorized" depois que a pessoa autorizar o pagamento lá no
 * Mercado Pago (e isso será tratado numa etapa futura, via webhook).
 */
export async function createSubscription({
  userId,
  payerEmail,
  backUrl,
  notificationUrl,
}: CreateSubscriptionParams): Promise<CreateSubscriptionResult> {
  const client = createMercadoPagoClient();
  const preApproval = new PreApproval(client);

  // "notification_url" ainda não está no tipo oficial do SDK (o suporte é
  // recente na API), por isso montamos o corpo separado antes de enviar —
  // assim mantemos checagem de tipo nos campos que o SDK já conhece.
  const requestBody = {
    reason: PLAN_REASON,
    external_reference: userId,
    payer_email: payerEmail,
    back_url: backUrl,
    notification_url: notificationUrl,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: PREMIUM_PRICE_BRL,
      currency_id: "BRL",
    },
  };

  const response = await preApproval.create({ body: requestBody });

  if (!response.id || !response.init_point) {
    throw new Error("Resposta inesperada do Mercado Pago ao criar a assinatura.");
  }

  return {
    id: response.id,
    status: response.status ?? "pending",
    initPoint: response.init_point,
  };
}

/**
 * Consulta o estado REAL e atual de uma assinatura direto no Mercado Pago.
 * Nunca confiamos apenas no conteúdo de uma notificação de webhook —
 * sempre reconfirmamos aqui antes de liberar ou revogar o Premium.
 */
export async function getSubscription(id: string) {
  const client = createMercadoPagoClient();
  const preApproval = new PreApproval(client);
  return preApproval.get({ id });
}
