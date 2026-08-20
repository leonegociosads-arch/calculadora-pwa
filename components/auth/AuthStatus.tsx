import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { logout } from "@/app/login/actions";

export async function AuthStatus() {
  if (!isSupabaseConfigured()) {
    return (
      <Link
        href="/login"
        className="shrink-0 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 text-sm text-neutral-300 transition hover:bg-neutral-800"
      >
        Entrar
      </Link>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="shrink-0 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 text-sm text-neutral-300 transition hover:bg-neutral-800"
      >
        Entrar
      </Link>
    );
  }

  return (
    <form action={logout} className="flex shrink-0 items-center gap-2">
      <span className="max-w-24 truncate text-sm text-neutral-400">{user.email}</span>
      <button
        type="submit"
        className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-300 transition hover:bg-neutral-800"
      >
        Sair
      </button>
    </form>
  );
}
