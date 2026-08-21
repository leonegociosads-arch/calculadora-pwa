"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { EMAIL_REGEX, translateAuthError } from "@/lib/supabase/authErrorMessages";
import { getOrigin } from "@/lib/getOrigin";

const NOT_CONFIGURED_MESSAGE =
  "Login ainda não configurado neste ambiente (faltam as chaves do Supabase).";
const INVALID_EMAIL_MESSAGE = "Esse e-mail não parece válido. Confira e tente de novo.";

export async function login(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(`/login?error=${encodeURIComponent(NOT_CONFIGURED_MESSAGE)}`);
  }

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!EMAIL_REGEX.test(email)) {
    redirect(`/login?error=${encodeURIComponent(INVALID_EMAIL_MESSAGE)}`);
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(translateAuthError(error))}`);
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

  if (!EMAIL_REGEX.test(email)) {
    redirect(`/cadastro?error=${encodeURIComponent(INVALID_EMAIL_MESSAGE)}`);
  }

  const origin = await getOrigin();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent("/login?confirmado=1")}`,
    },
  });

  if (error) {
    redirect(`/cadastro?error=${encodeURIComponent(translateAuthError(error))}`);
  }

  redirect("/cadastro?sucesso=1");
}

export async function requestPasswordReset(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(`/esqueci-senha?error=${encodeURIComponent(NOT_CONFIGURED_MESSAGE)}`);
  }

  const email = formData.get("email") as string;

  if (!EMAIL_REGEX.test(email)) {
    redirect(`/esqueci-senha?error=${encodeURIComponent(INVALID_EMAIL_MESSAGE)}`);
  }

  const origin = await getOrigin();

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=${encodeURIComponent("/redefinir-senha")}`,
  });

  if (error) {
    redirect(`/esqueci-senha?error=${encodeURIComponent(translateAuthError(error))}`);
  }

  redirect("/esqueci-senha?enviado=1");
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    redirect(`/redefinir-senha?error=${encodeURIComponent("As senhas não coincidem.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/redefinir-senha?error=${encodeURIComponent(translateAuthError(error))}`);
  }

  redirect("/login?sucesso=1");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
