import type { AuthError } from "@supabase/supabase-js";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGES: Record<string, string> = {
  invalid_credentials: "E-mail ou senha incorretos.",
  email_not_confirmed:
    "Confirme seu e-mail antes de entrar — verifique sua caixa de entrada (e o spam).",
  user_already_exists: "Esse e-mail já está cadastrado.",
  email_exists: "Esse e-mail já está cadastrado.",
  weak_password: "Senha muito fraca — use pelo menos 6 caracteres.",
  email_address_invalid: "Esse e-mail não é válido.",
  same_password: "A nova senha precisa ser diferente da senha atual.",
  over_email_send_rate_limit:
    "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.",
};

export function translateAuthError(error: AuthError): string {
  if (error.code && MESSAGES[error.code]) {
    return MESSAGES[error.code];
  }
  return error.message;
}
