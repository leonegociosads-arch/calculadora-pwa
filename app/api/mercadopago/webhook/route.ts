import { NextRequest, NextResponse } from "next/server";
import {
  WebhookSignatureValidator,
  InvalidWebhookSignatureError,
  SignatureFailureReason,
} from "mercadopago";
import { getSubscription } from "@/lib/mercadopago/subscriptions";
import { syncUserPlanFromSubscription } from "@/lib/supabase/subscriptionSync";

export async function POST(request: NextRequest) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  if (!secret) {
    // Sem a chave secreta configurada, não temos como confirmar a
    // autenticidade da notificação — recusamos, por segurança.
    return NextResponse.json({ error: "Webhook não configurado" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const dataId = searchParams.get("data.id");

  try {
    WebhookSignatureValidator.validate({
      xSignature: request.headers.get("x-signature"),
      xRequestId: request.headers.get("x-request-id"),
      dataId,
      secret,
      toleranceSeconds: 300,
    });
  } catch (error) {
    const reason =
      error instanceof InvalidWebhookSignatureError ? error.reason : null;

    // Quando a assinatura vem e está errada (forjada, adulterada ou expirada),
    // rejeitamos sempre. Só toleramos a ausência total do header — algumas
    // notificações de assinatura, configuradas via "notification_url" na
    // criação, podem não incluir x-signature. Nesses casos, a proteção real
    // continua sendo a reconsulta obrigatória à API abaixo, que nunca confia
    // no conteúdo da notificação.
    if (reason !== SignatureFailureReason.MissingSignatureHeader) {
      console.error("Webhook do Mercado Pago rejeitado:", reason);
      return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 });
    }

    console.warn(
      "Webhook do Mercado Pago sem x-signature — seguindo apenas com a reconsulta à API.",
    );
  }

  const body = await request.json().catch(() => null);

  // Por enquanto só processamos mudanças de status da assinatura em si.
  // Outros tópicos são confirmados (200) sem processamento, para o Mercado
  // Pago não ficar reenviando — serão tratados numa etapa futura.
  if (body?.type !== "subscription_preapproval" || !dataId) {
    return NextResponse.json({ received: true });
  }

  // Nunca confiamos no conteúdo da notificação — sempre reconsultamos o
  // estado real e atual da assinatura direto na API do Mercado Pago.
  let subscription;
  try {
    subscription = await getSubscription(dataId);
  } catch (error) {
    // ID que não existe (mais) no Mercado Pago — não é algo pra tentar de
    // novo, então confirmamos recebimento sem processar, em vez de dar 500
    // e fazer o Mercado Pago reenviar a notificação indefinidamente.
    console.warn(`Não foi possível consultar a assinatura ${dataId}:`, error);
    return NextResponse.json({ received: true });
  }

  if (!subscription.external_reference || !subscription.status || !subscription.id) {
    return NextResponse.json({ received: true });
  }

  await syncUserPlanFromSubscription({
    userId: subscription.external_reference,
    preapprovalId: subscription.id,
    status: subscription.status,
    nextPaymentDate: subscription.next_payment_date ?? null,
  });

  return NextResponse.json({ received: true });
}
