import { PageHeader } from "@/components/layout/PageHeader";
import { BpmCounter } from "@/components/bpm/BpmCounter";

export default function BpmPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="BPM" />
      <BpmCounter />
    </main>
  );
}
