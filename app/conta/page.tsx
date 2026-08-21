import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { getUserPlan } from "@/lib/supabase/profile";
import { PremiumGate } from "@/components/premium/PremiumGate";
import { cancelPremiumSubscription } from "@/app/premium/actions";

interface ContaPageProps {
  searchParams: Promise<{ error?: string; cancelado?: string }>;
}

export default async function ContaPage({ searchParams }: ContaPageProps) {
  const { error, cancelado } = await searchParams;

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

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .maybeSingle<{ status: string; current_period_end: string | null }>();

  const isCancelling = subscription?.status === "cancelled" && plan === "premium";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Minha conta" />

      {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
      {cancelado ? (
        <p className="text-center text-sm text-emerald-400">
          Renovação cancelada. Você continua com acesso Premium até o fim do período já pago.
        </p>
      ) : null}

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

        {isCancelling && subscription?.current_period_end ? (
          <p className="text-xs text-neutral-500">
            Renovação cancelada. Acesso Premium liberado até{" "}
            {new Date(subscription.current_period_end).toLocaleDateString("pt-BR")}.
          </p>
        ) : null}

        {subscription?.status === "authorized" ? (
          <form action={cancelPremiumSubscription}>
            <button
              type="submit"
              className="h-11 w-full rounded-2xl border border-red-900 bg-red-950/40 text-sm font-medium text-red-300 transition hover:bg-red-950/70"
            >
              Cancelar renovação automática
            </button>
          </form>
        ) : null}
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
