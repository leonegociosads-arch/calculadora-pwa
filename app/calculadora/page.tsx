import { PageHeader } from "@/components/layout/PageHeader";
import { Calculator } from "@/components/calculator/Calculator";

export default function CalculadoraPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Calculadora" />
      <Calculator />
    </main>
  );
}
