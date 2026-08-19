import { FeatureCard } from "@/components/home/FeatureCard";

const features = [
  {
    title: "Calculadora",
    description: "Operações básicas do dia a dia",
    href: "/calculadora",
  },
  {
    title: "Calculadora Científica",
    description: "Funções avançadas e trigonométricas",
    href: "/calculadora-cientifica",
  },
  {
    title: "Conversores",
    description: "Unidades, moedas e mais",
    href: "/conversores",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold text-neutral-900">Utilidades</h1>
        <p className="text-sm text-neutral-500">
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
