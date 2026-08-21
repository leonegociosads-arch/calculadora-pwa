import type { ReactNode } from "react";
import { isPremiumUser } from "@/lib/supabase/profile";
import { UpgradePrompt } from "./UpgradePrompt";

interface PremiumGateProps {
  children: ReactNode;
  title?: string;
}

/**
 * Componente reutilizável para proteger qualquer recurso Premium.
 * A checagem acontece no servidor (nunca no navegador), então não tem
 * como um usuário Free "enganar" isso escondendo/mostrando elementos.
 *
 * Uso: <PremiumGate>{conteúdo só para Premium}</PremiumGate>
 */
export async function PremiumGate({ children, title }: PremiumGateProps) {
  const premium = await isPremiumUser();

  if (premium) {
    return <>{children}</>;
  }

  return <UpgradePrompt title={title} />;
}
