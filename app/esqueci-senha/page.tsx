import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { requestPasswordReset } from "@/app/login/actions";

interface EsqueciSenhaPageProps {
  searchParams: Promise<{ error?: string; enviado?: string }>;
}

export default async function EsqueciSenhaPage({ searchParams }: EsqueciSenhaPageProps) {
  const { error, enviado } = await searchParams;

  if (enviado) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
        <PageHeader title="Recuperar senha" backHref="/login" />
        <p className="text-sm text-neutral-300">
          Se esse e-mail estiver cadastrado, você vai receber um link para redefinir sua
          senha. Confira sua caixa de entrada (e a pasta de spam).
        </p>
        <Link
          href="/login"
          className="h-12 rounded-2xl bg-blue-600 text-center text-base font-semibold leading-[3rem] text-white transition hover:bg-blue-500"
        >
          Voltar para o login
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Recuperar senha" backHref="/login" />

      <form action={requestPasswordReset} className="flex flex-col gap-4">
        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <p className="text-sm text-neutral-400">
          Digite o e-mail da sua conta e enviaremos um link para redefinir a senha.
        </p>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-neutral-400">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100"
          />
        </div>

        <button
          type="submit"
          className="h-12 rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-500"
        >
          Enviar link
        </button>
      </form>
    </main>
  );
}
