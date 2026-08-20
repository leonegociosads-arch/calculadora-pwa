import Link from "next/link";

interface PageHeaderProps {
  title: string;
  backHref?: string;
}

export function PageHeader({ title, backHref = "/" }: PageHeaderProps) {
  return (
    <header className="flex items-center gap-3">
      <Link
        href={backHref}
        aria-label="Voltar"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 transition hover:bg-neutral-800"
      >
        ←
      </Link>
      <h1 className="min-w-0 text-xl font-bold text-neutral-100">{title}</h1>
    </header>
  );
}
