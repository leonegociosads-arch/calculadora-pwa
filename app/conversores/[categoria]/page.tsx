import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { UnitConverter } from "@/components/converters/UnitConverter";
import { CurrencyConverter } from "@/components/converters/CurrencyConverter";
import { getConverter } from "@/lib/converters/registry";

interface ConversorPageProps {
  params: Promise<{ categoria: string }>;
}

export default async function ConversorPage({ params }: ConversorPageProps) {
  const { categoria } = await params;

  if (categoria === "moeda") {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
        <PageHeader title="Moeda" />
        <CurrencyConverter />
      </main>
    );
  }

  const converter = getConverter(categoria);

  if (!converter) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title={converter.title} />
      <UnitConverter slug={converter.slug} />
    </main>
  );
}
