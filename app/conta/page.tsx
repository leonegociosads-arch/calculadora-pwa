import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { getUserPlan } from "@/lib/supabase/profile";
import { PremiumGate } from "@/components/premium/PremiumGate";

export default async function ContaPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const plan = await getUserPlan();

  // Diagnóstico temporário — remover depois de resolver o problema do plano.
  const { data: debugRow, error: debugError } = await supabase
    .from("profiles")
    .select("id, plan")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Minha conta" />

      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-neutral-500">E-mail</span>
          <span className="text-base text-neutral-100">{user.email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-neutral-500">
            Conta criada em
          </span>
          <span className="text-base text-neutral-100">
            {new Date(user.created_at).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-neutral-500">Plano</span>
          <span className="text-base font-semibold text-neutral-100">
            {plan === "premium" ? "Premium ✨" : "Free"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 rounded-2xl border border-amber-800 bg-amber-950/30 p-4 text-xs text-amber-200">
        <span className="font-semibold">Diagnóstico temporário (remover depois)</span>
        <span>seu id de usuário: {user.id}</span>
        <span>linha encontrada em &quot;profiles&quot;: {JSON.stringify(debugRow)}</span>
        <span>erro da consulta: {debugError ? JSON.stringify(debugError) : "nenhum"}</span>
      </div>

      <PremiumGate title="Área de teste Premium">
        <div className="rounded-2xl border border-emerald-800 bg-emerald-950/40 p-5 text-sm text-emerald-300">
          Você é Premium! Esse bloco só aparece pra quem tem o plano ativo — é a
          demonstração de que o mecanismo de proteção está funcionando.
        </div>
      </PremiumGate>
    </main>
  );
}
