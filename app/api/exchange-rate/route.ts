import { NextResponse } from "next/server";

const BASE_CURRENCY = "USD";

export async function GET() {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Chave da API de câmbio não configurada." },
      { status: 500 },
    );
  }

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${BASE_CURRENCY}`,
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Não foi possível obter as cotações." },
      { status: 502 },
    );
  }

  const data = await response.json();

  return NextResponse.json({ base: BASE_CURRENCY, rates: data.conversion_rates });
}
