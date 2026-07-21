"use client";

import { useState } from "react";
import { toast } from "@/components/toast-provider";

const CA = "";

export default function TokenPage() {
  const [caCopied, setCaCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"transactions" | "topTraders">("transactions");

  const handleCopyCA = () => {
    try { navigator.clipboard.writeText(CA); } catch {}
    setCaCopied(true);
    setTimeout(() => setCaCopied(false), 2000);
    toast("Contract address copied");
  };

  const stats = [
    { label: "Price", value: "-" },
    { label: "Market Cap", value: "-" },
    { label: "24h Volume", value: "-" },
    { label: "Holders", value: "-" },
    { label: "24h Change", value: "-" },
    { label: "Circulating Supply", value: "-" },
    { label: "Total Supply", value: "1B" },
    { label: "ATH", value: "-" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="Loose" className="w-[110%] h-[110%] object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">$LOOSE Token</h1>
                <p className="text-sm text-muted">
                  The utility token of Loose
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted">CA:</span>
              <code className="text-xs font-mono bg-white/5 border border-card-border rounded-lg px-3 py-1.5 text-muted">
                {CA}
              </code>
              <button
                onClick={handleCopyCA}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-muted hover:text-white"
                title="Copy CA"
              >
                {caCopied ? (
                  <svg width="14" height="14" fill="none" stroke="#77FF33" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <a href="#" className="btn-lime text-sm !py-2">
            Buy $LOOSE
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-2xl bg-card-bg border border-card-border"
            >
              <div className="text-xs text-muted mb-1">{s.label}</div>
              <div className="text-lg font-bold">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-card-bg border border-card-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Price Chart</h2>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <svg width="48" height="48" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-3 opacity-40">
                <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 7h4v4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm font-semibold text-muted">Coming Soon</p>
              <p className="text-xs text-muted/50 mt-1">Chart will be available soon</p>
            </div>
          </div>
        </div>

        {/* Live Transactions */}
        <div className="p-6 rounded-2xl bg-card-bg border border-card-border">
          <div className="flex items-center gap-6 mb-4 border-b border-card-border pb-3">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`flex items-center gap-2 text-sm font-semibold pb-1 border-b-2 transition-colors ${
                activeTab === "transactions"
                  ? "border-lime text-white"
                  : "border-transparent text-muted hover:text-white"
              }`}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("topTraders")}
              className={`flex items-center gap-2 text-sm font-semibold pb-1 border-b-2 transition-colors ${
                activeTab === "topTraders"
                  ? "border-lime text-white"
                  : "border-transparent text-muted hover:text-white"
              }`}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Top Traders
            </button>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              <span className="text-xs text-lime font-medium">Live</span>
            </div>
          </div>

          {activeTab === "transactions" ? (
            <div className="h-48 flex items-center justify-center">
              <div className="text-center">
                <svg width="40" height="40" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-3 opacity-40">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
                <p className="text-sm font-semibold text-muted">Coming Soon</p>
                <p className="text-xs text-muted/50 mt-1">Transactions will appear soon</p>
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <div className="text-center">
                <svg width="40" height="40" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-3 opacity-40">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm font-semibold text-muted">Coming Soon</p>
                <p className="text-xs text-muted/50 mt-1">Top traders will appear soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
