import { PageHeader } from "@/components/layout/PageHeader";
import { FeatureCard } from "@/components/home/FeatureCard";
import { converters } from "@/lib/converters/registry";

export default function ConversoresPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Conversores" />
      <div className="grid grid-cols-1 gap-4">
        {converters.map((converter) => (
          <FeatureCard
            key={converter.slug}
            title={converter.title}
            description={`Converter valores de ${converter.title.toLowerCase()}`}
            href={`/conversores/${converter.slug}`}
          />
        ))}
        <FeatureCard
          title="Moeda"
          description="Cotações atualizadas em tempo real"
          href="/conversores/moeda"
        />
      </div>
    </main>
  );
}
