import { Calculator, Sigma, ArrowLeftRight, Music } from "lucide-react";
import { AppTile } from "@/components/home/AppTile";

const features = [
  { title: "Calculadora", href: "/calculadora", icon: Calculator },
  { title: "Calculadora Científica", href: "/calculadora-cientifica", icon: Sigma },
  { title: "Conversores", href: "/conversores", icon: ArrowLeftRight },
  { title: "BPM", href: "/bpm", icon: Music },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold text-neutral-100">Calculex</h1>
        <p className="text-sm text-neutral-400">
          Escolha uma ferramenta para começar
        </p>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <AppTile key={feature.href} {...feature} />
        ))}
      </div>
    </main>
  );
}
