import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { login } from "./actions";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; sucesso?: string; confirmado?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, sucesso, confirmado } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <PageHeader title="Entrar" />

      <form action={login} className="flex flex-col gap-4">
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {sucesso ? (
          <p className="text-sm text-emerald-400">Senha atualizada! Entre com a nova senha.</p>
        ) : null}
        {confirmado ? (
          <p className="text-sm text-emerald-400">E-mail confirmado! Já pode entrar.</p>
        ) : null}

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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm text-neutral-400">
              Senha
            </label>
            <Link href="/esqueci-senha" className="text-xs text-blue-400 underline">
              Esqueceu a senha?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100"
          />
        </div>

        <button
          type="submit"
          className="h-12 rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-500"
        >
          Entrar
        </button>
      </form>

      <p className="text-center text-sm text-neutral-400">
        Não tem conta?{" "}
        <Link href="/cadastro" className="text-blue-400 underline">
          Cadastre-se
        </Link>
      </p>
    </main>
  );
}
