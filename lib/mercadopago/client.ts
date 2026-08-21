import "server-only";
import { MercadoPagoConfig } from "mercadopago";

/**
 * Cria o cliente do Mercado Pago. Só pode ser chamado no servidor
 * (Route Handlers, Server Actions, Server Components) — o pacote
 * "server-only" garante isso, quebrando o build se algum componente
 * "use client" tentar importar este arquivo por engano.
 */
export function createMercadoPagoClient(): MercadoPagoConfig {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "MERCADOPAGO_ACCESS_TOKEN não configurado. Adicione a chave de teste no .env.local.",
    );
  }

  return new MercadoPagoConfig({ accessToken });
}
