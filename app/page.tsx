import Link from "next/link";
import Image from "next/image";
import { Calculator, Sigma, ArrowLeftRight, Music, Crown, ChevronRight } from "lucide-react";
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
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <Image
              src="/icon.jpg"
              alt=""
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
            <h1 className="text-3xl font-bold text-neutral-100">Calculex</h1>
          </div>
          <p className="text-sm text-neutral-400">Escolha uma ferramenta para começar</p>
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
          className="flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-base font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-indigo-500"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
            <Crown size={16} strokeWidth={2} />
          </span>
          <span className="flex-1 text-center">Assinar Premium</span>
          <ChevronRight size={20} className="shrink-0" />
        </Link>
      ) : null}
    </main>
  );
}
