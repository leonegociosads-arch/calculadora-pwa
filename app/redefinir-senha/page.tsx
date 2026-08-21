import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { updatePassword } from "@/app/login/actions";

interface RedefinirSenhaPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function RedefinirSenhaPage({ searchParams }: RedefinirSenhaPageProps) {
  const { error } = await searchParams;

  const hasSession = isSupabaseConfigured() && (await hasValidSession());

  if (!hasSession) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
        <PageHeader title="Redefinir senha" backHref="/login" />
        <p className="text-sm text-neutral-300">
          Esse link expirou ou é inválido. Solicite um novo link de recuperação.
        </p>
        <Link
          href="/esqueci-senha"
          className="h-12 rounded-2xl bg-blue-600 text-center text-base font-semibold leading-[3rem] text-white transition hover:bg-blue-500"
        >
          Solicitar novo link
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Redefinir senha" backHref="/login" />

      <form action={updatePassword} className="flex flex-col gap-4">
        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-neutral-400">
            Nova senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required
            className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm text-neutral-400">
            Confirmar nova senha
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required
            className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100"
          />
        </div>

        <button
          type="submit"
          className="h-12 rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-500"
        >
          Salvar nova senha
        </button>
      </form>
    </main>
  );
}

async function hasValidSession(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user !== null;
}
