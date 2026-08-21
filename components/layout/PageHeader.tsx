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
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-800/50 bg-neutral-900 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] transition hover:bg-neutral-800"
      >
        ←
      </Link>
      <h1 className="min-w-0 text-2xl font-bold text-neutral-100">{title}</h1>
    </header>
  );
}
