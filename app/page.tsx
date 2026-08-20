import { Calculator, Sigma, ArrowLeftRight } from "lucide-react";
import { FeatureCard } from "@/components/home/FeatureCard";

const features = [
  {
    title: "Calculadora",
    description: "Operações básicas do dia a dia",
    href: "/calculadora",
    icon: Calculator,
  },
  {
    title: "Calculadora Científica",
    description: "Funções avançadas e trigonométricas",
    href: "/calculadora-cientifica",
    icon: Sigma,
  },
  {
    title: "Conversores",
    description: "Unidades, moedas e mais",
    href: "/conversores",
    icon: ArrowLeftRight,
  },
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
      <div className="grid grid-cols-1 gap-4">
        {features.map((feature) => (
          <FeatureCard key={feature.href} {...feature} />
        ))}
      </div>
    </main>
  );
}
