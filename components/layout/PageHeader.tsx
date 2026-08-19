import Link from "next/link";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="flex items-center gap-3">
      <Link
        href="/"
        aria-label="Voltar para a Home"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100"
      >
        ←
      </Link>
      <h1 className="text-xl font-bold text-neutral-900">{title}</h1>
    </header>
  );
}
