import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Calculex",
    short_name: "Calculex",
    description: "Calculadora, calculadora científica e conversores em um só app",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon-192.jpg", sizes: "192x192", type: "image/jpeg" },
      { src: "/icon-512.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}
