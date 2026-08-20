import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#60a5fa",
          fontSize: 320,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        C
      </div>
    ),
    { width: 512, height: 512 },
  );
}
