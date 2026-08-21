import Link from "next/link";
import { Calculator, Sigma, ArrowLeftRight, Music } from "lucide-react";
import { AppTile } from "@/components/home/AppTile";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { getUserPlan } from "@/lib/supabase/profile";

const features = [
  { title: "Calculadora", href: "/calculadora", icon: Calculator },
  { title: "Calculadora Científica", href: "/calculadora-cientifica", icon: Sigma, premium: true },
  { title: "Conversores", href: "/conversores", icon: ArrowLeftRight },
  { title: "BPM", href: "/bpm", icon: Music },
];

export default async function Home() {
  const plan = await getUserPlan();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-neutral-100">Calculex</h1>
          <p className="text-sm text-neutral-400">
            Escolha uma ferramenta para começar
          </p>
        </div>
        <AuthStatus />
      </header>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <AppTile key={feature.href} {...feature} />
        ))}
      </div>
      {plan !== "premium" ? (
        <Link
          href="/premium"
          className="flex h-12 items-center justify-center rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-500"
        >
          Assinar Premium
        </Link>
      ) : null}
    </main>
  );
}
