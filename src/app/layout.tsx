import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WalletProvider } from "@/components/wallet-provider";
import { AgentProvider } from "@/components/agent-provider";
import { LoadingScreen } from "@/components/loading-screen";
import { PageLoader } from "@/components/page-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loose | AI Agent Launchpad on Robinhood Chain",
  description:
    "Launch, deploy, and monetize autonomous AI agents on Robinhood Chain. The premier AI agent launchpad on Arbitrum L2.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Loose | AI Agent Launchpad on Robinhood Chain",
    description:
      "Launch, deploy, and monetize autonomous AI agents on Robinhood Chain. The premier AI agent launchpad on Arbitrum L2.",
    url: "https://looseagent.app",
    siteName: "Loose",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loose | AI Agent Launchpad on Robinhood Chain",
    description:
      "Launch, deploy, and monetize autonomous AI agents on Robinhood Chain.",
    creator: "@trylooseagent",
  },
  metadataBase: new URL("https://looseagent.app"),
  other: {
    "virtual-protocol-site-verification": "10e14367630d87e3894c361b028f66ad",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0911] text-white">
        <WalletProvider>
          <AgentProvider>
              <LoadingScreen />
              <PageLoader />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
          </AgentProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
