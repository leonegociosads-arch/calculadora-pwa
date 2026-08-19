import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Utilidades",
  description: "PWA de utilidades: calculadora, calculadora científica e conversores",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
