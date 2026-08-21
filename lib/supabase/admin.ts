import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente com privilégio total (ignora RLS) — usa a service_role key.
 *
 * Só deve ser usado no servidor, em código de confiança que o próprio
 * backend decide executar (ex: depois de já termos confirmado quem é o
 * usuário logado). Não representa "o usuário logado" — não usa cookies
 * nem sessão, representa o próprio backend agindo com privilégio
 * administrativo. Nunca deve ser exposto a nenhum componente de cliente.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY não configurado. Adicione no .env.local.",
    );
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
