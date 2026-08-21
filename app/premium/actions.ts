"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { isMercadoPagoConfigured } from "@/lib/mercadopago/isConfigured";
import { createSubscription } from "@/lib/mercadopago/subscriptions";
import { getOrigin } from "@/lib/getOrigin";

const GENERIC_ERROR_MESSAGE =
  "Não foi possível iniciar a assinatura agora. Tente novamente em instantes.";

export async function subscribeToPremium() {
  if (!isSupabaseConfigured() || !isMercadoPagoConfigured()) {
    redirect(
      `/premium?error=${encodeURIComponent("Assinatura ainda não configurada neste ambiente.")}`,
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  const admin = createAdminClient();

  // Evita criar uma segunda assinatura enquanto já existe uma pendente ou
  // ativa — protege contra cliques repetidos e contra cobrança duplicada.
  const { data: existing, error: existingError } = await admin
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingError) {
    console.error("Falha ao consultar assinatura existente:", existingError);
    redirect(`/premium?error=${encodeURIComponent(GENERIC_ERROR_MESSAGE)}`);
  }

  if (existing?.status === "authorized") {
    redirect(`/premium?error=${encodeURIComponent("Você já é Premium.")}`);
  }

  if (existing?.status === "pending") {
    redirect(
      `/premium?error=${encodeURIComponent(
        "Você já tem uma assinatura em processamento. Aguarde a confirmação antes de tentar de novo.",
      )}`,
    );
  }

  const origin = await getOrigin();

  let subscription;
  try {
    subscription = await createSubscription({
      userId: user.id,
      payerEmail: user.email,
      backUrl: `${origin}/premium?retorno=1`,
      notificationUrl: `${origin}/api/mercadopago/webhook`,
    });
  } catch (error) {
    console.error("Falha ao criar assinatura no Mercado Pago:", error);
    redirect(`/premium?error=${encodeURIComponent(GENERIC_ERROR_MESSAGE)}`);
  }

  // Guarda a intenção de assinatura como "pending" — isso NÃO libera o
  // Premium. O plano só muda quando o Mercado Pago confirmar o pagamento,
  // via webhook. Usamos o cliente admin porque o usuário comum não tem
  // permissão de escrever nessa tabela.
  const { error: upsertError } = await admin.from("subscriptions").upsert({
    user_id: user.id,
    mercadopago_preapproval_id: subscription.id,
    status: subscription.status,
  });

  if (upsertError) {
    console.error("Falha ao salvar assinatura pendente:", upsertError);
    redirect(`/premium?error=${encodeURIComponent(GENERIC_ERROR_MESSAGE)}`);
  }

  redirect(subscription.initPoint);
}
