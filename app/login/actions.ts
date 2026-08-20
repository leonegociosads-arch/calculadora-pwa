"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";

const NOT_CONFIGURED_MESSAGE =
  "Login ainda não configurado neste ambiente (faltam as chaves do Supabase).";

export async function login(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(`/login?error=${encodeURIComponent(NOT_CONFIGURED_MESSAGE)}`);
  }

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(`/cadastro?error=${encodeURIComponent(NOT_CONFIGURED_MESSAGE)}`);
  }

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/cadastro?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/cadastro?sucesso=1");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
