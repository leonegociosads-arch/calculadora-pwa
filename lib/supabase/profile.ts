import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";

export type Plan = "free" | "premium";

interface ProfileRow {
  plan: string;
}

/**
 * Consulta o plano do usuário logado. Sempre lê pela sessão do próprio usuário
 * (protegida por RLS) — nunca usa uma chave secreta, e nunca confia em nada
 * vindo do navegador. Se não houver usuário, tabela ou linha de perfil,
 * o padrão é sempre "free" (mais seguro do que assumir "premium" por engano).
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
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  return data?.plan === "premium" ? "premium" : "free";
}

export async function isPremiumUser(): Promise<boolean> {
  return (await getUserPlan()) === "premium";
}
