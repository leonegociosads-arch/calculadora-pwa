import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
}

export function FeatureCard({ title, description, href }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md active:scale-[0.98]"
    >
      <span className="text-lg font-semibold text-neutral-900">{title}</span>
      <span className="text-sm text-neutral-500">{description}</span>
    </Link>
  );
}
