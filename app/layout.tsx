import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculex",
  description: "Calculex: calculadora, calculadora científica e conversores em um só app",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Calculex",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
