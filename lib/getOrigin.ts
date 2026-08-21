import "server-only";
import { headers } from "next/headers";

export async function getOrigin(): Promise<string> {
  const headersList = await headers();
  const origin = headersList.get("origin");
  if (origin) {
    return origin;
  }
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
