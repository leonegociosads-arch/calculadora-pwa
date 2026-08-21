import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";

export type Plan = "free" | "premium";

interface SubscriptionRow {
  status: string;
  current_period_end: string | null;
}

/**
 * Consulta se o usuário logado tem acesso Premium agora. Sempre lê pela
 * sessão do próprio usuário (protegida por RLS) — nunca usa uma chave
 * secreta, e nunca confia em nada vindo do navegador.
 *
 * O acesso conta como Premium em dois casos:
 * - a assinatura está "authorized" (em dia, cobrando normalmente); ou
 * - a assinatura foi cancelada/pausada, mas o período já pago
 *   (current_period_end) ainda não terminou — a pessoa cancelou a
 *   renovação, mas continua podendo usar até o fim do que já pagou.
 *
 * Se não houver usuário, assinatura, ou qualquer dúvida, o padrão é
 * sempre "free" — mais seguro do que assumir "premium" por engano.
 */
export async function getUserPlan(): Promise<Plan> {
  if (!isSupabaseConfigured()) {
    return "free";
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "free";
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .maybeSingle<SubscriptionRow>();

  if (!data) {
    return "free";
  }

  if (data.status === "authorized") {
    return "premium";
  }

  if (data.current_period_end && new Date(data.current_period_end) > new Date()) {
    return "premium";
  }

  return "free";
}

export async function isPremiumUser(): Promise<boolean> {
  return (await getUserPlan()) === "premium";
}
