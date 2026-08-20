import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { signup } from "@/app/login/actions";

interface CadastroPageProps {
  searchParams: Promise<{ error?: string; sucesso?: string }>;
}

export default async function CadastroPage({ searchParams }: CadastroPageProps) {
  const { error, sucesso } = await searchParams;

  if (sucesso) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
        <PageHeader title="Cadastro" backHref="/login" />
        <p className="text-sm text-neutral-300">
          Quase lá! Enviamos um link de confirmação para o seu e-mail — clique nele para
          ativar sua conta e depois volte para fazer login.
        </p>
        <Link
          href="/login"
          className="h-12 rounded-2xl bg-blue-600 text-center text-base font-semibold leading-[3rem] text-white transition hover:bg-blue-500"
        >
          Ir para o login
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Cadastro" backHref="/login" />

      <form action={signup} className="flex flex-col gap-4">
        {error ? <p className="text-sm text-red-400">{error}</p> : null}

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

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-neutral-400">
            Senha
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

        <button
          type="submit"
          className="h-12 rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-500"
        >
          Criar conta
        </button>
      </form>

      <p className="text-center text-sm text-neutral-400">
        Já tem conta?{" "}
        <Link href="/login" className="text-blue-400 underline">
          Entrar
        </Link>
      </p>
    </main>
  );
}
