import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { getUserPlan } from "@/lib/supabase/profile";
import { subscribeToPremium } from "./actions";

const beneficios = [
  "Calculadora Científica completa (trigonometria, log, potência e mais)",
  "Acesso prioritário a novas ferramentas assim que forem lançadas",
  "Apoie o desenvolvimento contínuo do Calculex",
];

const comparacao = [
  { recurso: "Calculadora básica", free: true, premium: true },
  { recurso: "Conversores (unidades, moeda)", free: true, premium: true },
  { recurso: "Medidor de BPM", free: true, premium: true },
  { recurso: "Calculadora Científica", free: false, premium: true },
];

interface PremiumPageProps {
  searchParams: Promise<{ error?: string; retorno?: string }>;
}

export default async function PremiumPage({ searchParams }: PremiumPageProps) {
  const { error, retorno } = await searchParams;
  const plan = await getUserPlan();
  const isPremium = plan === "premium";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Premium" />

      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-2xl font-bold text-neutral-100">Calculex Premium</h2>
        <p className="text-sm text-neutral-400">Desbloqueie todos os recursos avançados</p>
      </div>

      {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}

      {!isPremium && retorno ? (
        <p className="rounded-2xl border border-blue-800 bg-blue-950/30 p-4 text-center text-sm text-blue-300">
          Estamos confirmando seu pagamento — isso pode levar alguns instantes. Recarregue
          a página daqui a pouco.
        </p>
      ) : null}

      {isPremium ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-800 bg-emerald-950/40 p-6 text-center">
          <span className="text-lg font-semibold text-emerald-300">Você já é Premium ✨</span>
          <span className="text-sm text-emerald-400/80">
            Obrigado por apoiar o Calculex. Todos os recursos estão liberados na sua conta.
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center">
            <span className="text-4xl font-bold text-neutral-100">
              R$ 9,90
              <span className="text-base font-normal text-neutral-400">/mês</span>
            </span>
            <span className="text-xs text-neutral-500">Cobrança recorrente, cancele quando quiser</span>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <span className="text-sm font-semibold text-neutral-200">O que você ganha</span>
            <ul className="flex flex-col gap-2">
              {beneficios.map((beneficio) => (
                <li key={beneficio} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <span className="text-sm font-semibold text-neutral-200">Free x Premium</span>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <span>Recurso</span>
                <span className="text-center">Free</span>
                <span className="text-center">Premium</span>
              </div>
              {comparacao.map((item) => (
                <div
                  key={item.recurso}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm text-neutral-300"
                >
                  <span>{item.recurso}</span>
                  <span className="text-center">{item.free ? "✓" : "—"}</span>
                  <span className="text-center text-emerald-400">{item.premium ? "✓" : "—"}</span>
                </div>
              ))}
            </div>
          </div>

          <form action={subscribeToPremium} className="flex flex-col gap-3">
            <button
              type="submit"
              className="h-12 rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-500"
            >
              Assinar Premium
            </button>
            <p className="text-center text-xs text-neutral-500">
              Assinatura mensal recorrente via Mercado Pago — a cobrança se repete
              automaticamente todo mês. Você pode cancelar quando quiser, sem multa.
            </p>
            <p className="text-center text-xs text-neutral-500">
              Ao assinar, você concorda com os{" "}
              <Link href="/termos" className="text-blue-400 underline">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link href="/privacidade" className="text-blue-400 underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </form>
        </>
      )}
    </main>
  );
}
