import { ImageResponse } from "next/og";

export const alt = "Loose - AI Agent Launchpad on Robinhood Chain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0911",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="512" height="512" rx="64" fill="#0B0911" />
            <path
              d="M256 72 C280 160 340 210 340 220 C340 230 340 280 340 292 C280 360 256 440 256 440 C256 440 232 360 172 292 C172 280 172 230 172 220 C172 210 232 160 256 72Z"
              fill="#77FF33"
            />
            <path
              d="M172 220 C140 200 100 230 88 256 C100 282 140 312 172 292"
              fill="#77FF33"
              opacity="0.8"
            />
            <path
              d="M340 220 C372 200 412 230 424 256 C412 282 372 312 340 292"
              fill="#77FF33"
              opacity="0.8"
            />
            <rect x="200" y="224" width="112" height="64" rx="32" fill="#0B0911" />
            <rect x="222" y="242" width="24" height="28" rx="7" fill="#77FF33" />
            <rect x="266" y="242" width="24" height="28" rx="7" fill="#77FF33" />
          </svg>
          <span style={{ fontSize: "56px", fontWeight: 700, color: "#ffffff" }}>
            Loose
          </span>
        </div>
        <div
          style={{
            fontSize: "38px",
            fontWeight: 600,
            color: "#77FF33",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          AI Agent Launchpad
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#737373",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Deploy, manage, and monetize autonomous AI agents on Robinhood Chain
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "48px",
          }}
        >
          {["24/7 Agents", "Zero Platform Fee", "Onchain Verified"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "18px",
                color: "#a0a0a0",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#77FF33",
                }}
              />
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
