import { PageHeader } from "@/components/layout/PageHeader";
import { ScientificCalculator } from "@/components/calculator/ScientificCalculator";
import { PremiumGate } from "@/components/premium/PremiumGate";

export default function CalculadoraCientificaPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Calculadora Científica" />
      <PremiumGate title="Calculadora Científica">
        <ScientificCalculator />
      </PremiumGate>
    </main>
  );
}
