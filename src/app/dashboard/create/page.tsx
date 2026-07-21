"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useWallet } from "@/components/wallet-provider";
import { useAgents } from "@/components/agent-provider";
import { toast } from "@/components/toast-provider";

const strategies: Array<{ id: string; name: string; desc: string; risk: string; icon: React.ReactNode; comingSoon?: boolean }> = [
  {
    id: "arb",
    name: "Arbitrage Scanner",
    desc: "Capture cross-DEX price differences on Robinhood Chain",
    risk: "Low",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "rebalancer",
    name: "Portfolio Rebalancer",
    desc: "Maintain target allocations and rebalance automatically",
    risk: "Low",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "whale",
    name: "Whale Tracker",
    desc: "Mirror whale wallet trades with customizable delay and filters",
    risk: "Medium",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 8v6m-3-3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "sniper",
    name: "Token Sniper",
    desc: "Auto-detect and snipe new token launches on Robinhood Chain",
    risk: "High",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "custom",
    name: "Custom Strategy",
    desc: "Build your own agent with custom logic and parameters",
    risk: "Variable",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 14v7m-3.5-3.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const MIN_BUDGET: Record<string, number> = {
  low: 1000000,
  medium: 3000000,
  high: 5000000,
  variable: 1000000,
};

export default function CreateAgentPage() {
  const { isConnected, connect } = useWallet();
  const { addAgent } = useAgents();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [budgetError, setBudgetError] = useState("");
  const [showWallet, setShowWallet] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    strategy: "",
    budget: "",
    riskLevel: "",
    stopLoss: "10",
    takeProfit: "50",
    autoRestart: true,
    targetAddresses: [""] as string[],
    tokenPairs: [""] as string[],
    preferredPool: "",
    customDescription: "",
    snipeAmount: "",
  });
  const [addressError, setAddressError] = useState("");
  const [pairError, setPairError] = useState("");

  useEffect(() => {
    const s = searchParams.get("strategy");
    if (s && strategies.some((st) => st.id === s)) {
      setForm((f) => ({ ...f, strategy: s }));
    }
  }, [searchParams]);

  const isValidEvmAddress = (addr: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(addr);

  const isValidTokenPair = (pair: string) =>
    /^[A-Za-z0-9]+\/[A-Za-z0-9]+$/.test(pair.trim());

  const validateStrategyFields = (): boolean => {
    setAddressError("");
    setPairError("");

    if (form.strategy === "whale" || form.strategy === "sniper" || form.strategy === "rebalancer") {
      const filled = form.targetAddresses.filter(Boolean);
      if (filled.length === 0 && form.strategy !== "sniper") {
        setAddressError(form.strategy === "whale" ? "Enter at least one wallet address to track" : "Enter at least one wallet address");
        return false;
      }
      const invalid = filled.find((a) => !isValidEvmAddress(a));
      if (invalid) {
        setAddressError("Invalid EVM address. Must start with 0x followed by 40 hex characters");
        return false;
      }
    }

    if (form.strategy === "arb") {
      const filled = form.tokenPairs.filter(Boolean);
      if (filled.length === 0) {
        setPairError("Enter at least one token pair");
        return false;
      }
      const invalid = filled.find((p) => !isValidTokenPair(p));
      if (invalid) {
        setPairError("Invalid format. Use TOKEN/TOKEN (e.g. LOOSE/USDC)");
        return false;
      }
    }

    return true;
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-28 pb-12">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="p-8 rounded-2xl bg-card-bg border border-card-border">
            <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="14" rx="3" />
                <path d="M16 12.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#77FF33" />
                <path d="M6 6V5a3 3 0 013-3h6a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Wallet Not Connected</h2>
            <p className="text-sm text-muted mb-6">
              Connect your wallet to deploy AI agents on Robinhood Chain.
            </p>
            <button onClick={connect} className="btn-lime w-full justify-center mb-3">
              Connect Wallet
            </button>
            <Link href="/dashboard" className="text-sm text-muted hover:text-lime transition-colors">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-xl border border-card-border bg-card-bg flex items-center justify-center text-muted hover:text-white hover:border-lime/30 transition-all"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Deploy New Agent</h1>
            <p className="text-xs text-muted mt-0.5">Step {step} of 3</p>
          </div>
        </div>

        <div className="flex gap-2 mb-10">
          {[
            { n: 1, label: "Strategy" },
            { n: 2, label: "Configure" },
            { n: 3, label: "Deploy" },
          ].map((s) => (
            <div key={s.n} className="flex-1">
              <div
                className={`h-1 rounded-full transition-all mb-2 ${
                  s.n <= step ? "bg-lime" : "bg-card-border"
                }`}
              />
              <span className={`text-[10px] uppercase tracking-wider ${
                s.n <= step ? "text-lime" : "text-muted/50"
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Choose a Strategy</h2>
            <p className="text-sm text-muted mb-6">Select a template to get started, or build from scratch.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strategies.map((s) => (
                <button
                  key={s.id}
                  onClick={() =>
                    !(s.comingSoon) && setForm((f) => ({ ...f, strategy: s.id, riskLevel: s.risk.toLowerCase() }))
                  }
                  className={`group p-5 rounded-2xl border text-left transition-all duration-200 relative ${
                    s.comingSoon
                      ? "border-card-border bg-card-bg opacity-60 cursor-not-allowed"
                      : form.strategy === s.id
                      ? "border-lime bg-lime/5"
                      : "border-card-border bg-card-bg hover:border-lime/30"
                  }`}
                >
                  {s.comingSoon && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-semibold">
                      Coming Soon
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
                      form.strategy === s.id && !(s.comingSoon)
                        ? "border-lime/40 bg-lime/10 text-lime"
                        : "border-card-border text-muted group-hover:text-lime group-hover:border-lime/30"
                    }`}>
                      {s.icon}
                    </div>
                    {!(s.comingSoon) && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          s.risk === "High"
                            ? "bg-red-500/10 text-red-400"
                            : s.risk === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : s.risk === "Low"
                            ? "bg-lime/10 text-lime"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {s.risk}
                      </span>
                    )}
                  </div>
                  <h3 className={`font-semibold mb-1 transition-colors ${
                    form.strategy === s.id && !(s.comingSoon) ? "text-lime" : ""
                  }`}>{s.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => form.strategy && setStep(2)}
                disabled={!form.strategy}
                className="btn-lime disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Configure Your Agent</h2>
            <p className="text-sm text-muted mb-6">Set your parameters and risk preferences.</p>
            <div className="p-6 rounded-2xl bg-card-bg border border-card-border space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. Alpha Hunter"
                  className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors"
                />
              </div>

              {form.strategy === "arb" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Token Pairs</label>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, tokenPairs: [...f.tokenPairs, ""] }))}
                      className="text-xs text-lime hover:text-lime-light transition-colors flex items-center gap-1"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14" strokeLinecap="round" /></svg>
                      Add Pair
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.tokenPairs.map((pair, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={pair}
                          onChange={(e) => {
                            const updated = [...form.tokenPairs];
                            updated[i] = e.target.value;
                            setForm((f) => ({ ...f, tokenPairs: updated }));
                          }}
                          placeholder={`e.g. ${i === 0 ? "LOOSE/USDC" : "RBN/ETH"}`}
                          className="flex-1 px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors"
                        />
                        {form.tokenPairs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, tokenPairs: f.tokenPairs.filter((_, j) => j !== i) }))}
                            className="w-9 h-9 shrink-0 rounded-lg border border-card-border flex items-center justify-center text-muted hover:text-red-400 hover:border-red-400/30 transition-colors"
                          >
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {pairError ? (
                    <p className="text-xs text-red-400 mt-1.5">{pairError}</p>
                  ) : (
                    <p className="text-xs text-muted/60 mt-1.5">Token pairs to scan for arbitrage opportunities</p>
                  )}
                </div>
              )}

              {form.strategy === "rebalancer" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Wallet Addresses</label>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, targetAddresses: [...f.targetAddresses, ""] }))}
                      className="text-xs text-lime hover:text-lime-light transition-colors flex items-center gap-1"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14" strokeLinecap="round" /></svg>
                      Add Wallet
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.targetAddresses.map((addr, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={addr}
                          onChange={(e) => {
                            const updated = [...form.targetAddresses];
                            updated[i] = e.target.value;
                            setForm((f) => ({ ...f, targetAddresses: updated }));
                          }}
                          placeholder="0x... portfolio wallet address"
                          className="flex-1 px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors font-mono text-xs"
                        />
                        {form.targetAddresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, targetAddresses: f.targetAddresses.filter((_, j) => j !== i) }))}
                            className="w-9 h-9 shrink-0 rounded-lg border border-card-border flex items-center justify-center text-muted hover:text-red-400 hover:border-red-400/30 transition-colors"
                          >
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {addressError ? (
                    <p className="text-xs text-red-400 mt-1.5">{addressError}</p>
                  ) : (
                    <p className="text-xs text-muted/60 mt-1.5">Wallets to monitor and rebalance automatically</p>
                  )}
                </div>
              )}

              {form.strategy === "whale" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Wallets to Track</label>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, targetAddresses: [...f.targetAddresses, ""] }))}
                      className="text-xs text-lime hover:text-lime-light transition-colors flex items-center gap-1"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14" strokeLinecap="round" /></svg>
                      Add Wallet
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.targetAddresses.map((addr, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={addr}
                          onChange={(e) => {
                            const updated = [...form.targetAddresses];
                            updated[i] = e.target.value;
                            setForm((f) => ({ ...f, targetAddresses: updated }));
                          }}
                          placeholder={`0x... whale wallet #${i + 1}`}
                          className="flex-1 px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors font-mono text-xs"
                        />
                        {form.targetAddresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, targetAddresses: f.targetAddresses.filter((_, j) => j !== i) }))}
                            className="w-9 h-9 shrink-0 rounded-lg border border-card-border flex items-center justify-center text-muted hover:text-red-400 hover:border-red-400/30 transition-colors"
                          >
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {addressError ? (
                    <p className="text-xs text-red-400 mt-1.5">{addressError}</p>
                  ) : (
                    <p className="text-xs text-muted/60 mt-1.5">Whale wallet addresses you want to mirror trades from</p>
                  )}
                </div>
              )}

              {form.strategy === "sniper" && (
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium">Contract Addresses (CA)</label>
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, targetAddresses: [...f.targetAddresses, ""] }))}
                        className="text-xs text-lime hover:text-lime-light transition-colors flex items-center gap-1"
                      >
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14" strokeLinecap="round" /></svg>
                        Add CA
                      </button>
                    </div>
                    <div className="space-y-2">
                      {form.targetAddresses.map((addr, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={addr}
                            onChange={(e) => {
                              const updated = [...form.targetAddresses];
                              updated[i] = e.target.value;
                              setForm((f) => ({ ...f, targetAddresses: updated }));
                            }}
                            placeholder={`0x... token contract #${i + 1}`}
                            className="flex-1 px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors font-mono text-xs"
                          />
                          {form.targetAddresses.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setForm((f) => ({ ...f, targetAddresses: f.targetAddresses.filter((_, j) => j !== i) }))}
                              className="w-9 h-9 shrink-0 rounded-lg border border-card-border flex items-center justify-center text-muted hover:text-red-400 hover:border-red-400/30 transition-colors"
                            >
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {addressError ? (
                      <p className="text-xs text-red-400 mt-1.5">{addressError}</p>
                    ) : (
                      <p className="text-xs text-muted/60 mt-1.5">Target token CAs to snipe, or leave blank for auto-detect new launches</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Snipe Amount (ETH)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={form.snipeAmount}
                        onChange={(e) => setForm((f) => ({ ...f, snipeAmount: e.target.value }))}
                        placeholder="e.g. 0.05"
                        className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors"
                      />
                      <span className="text-xs text-muted whitespace-nowrap">ETH</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {["0.01", "0.05", "0.1", "0.5"].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, snipeAmount: val }))}
                          className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                            form.snipeAmount === val
                              ? "border-lime bg-lime/10 text-lime"
                              : "border-card-border bg-card-bg text-muted hover:border-lime/30"
                          }`}
                        >
                          {val} ETH
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted/60 mt-1.5">Amount of ETH to spend per snipe transaction on Robinhood Chain</p>
                  </div>
                </div>
              )}

              {form.strategy === "custom" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Strategy Description</label>
                  <textarea
                    value={form.customDescription}
                    onChange={(e) => setForm((f) => ({ ...f, customDescription: e.target.value }))}
                    placeholder="Describe your custom strategy logic..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors resize-none"
                  />
                  <p className="text-xs text-muted/60 mt-1.5">Define what your custom agent should do</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Budget ($LOOSE)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(form.riskLevel === "high"
                    ? [
                        { label: "5M", value: "5000000" },
                        { label: "7.5M", value: "7500000" },
                        { label: "10M", value: "10000000" },
                      ]
                    : form.riskLevel === "medium"
                    ? [
                        { label: "3M", value: "3000000" },
                        { label: "5M", value: "5000000" },
                        { label: "7.5M", value: "7500000" },
                      ]
                    : [
                        { label: "1M", value: "1000000" },
                        { label: "2.5M", value: "2500000" },
                        { label: "5M", value: "5000000" },
                      ]
                  ).map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setForm((f) => ({ ...f, budget: b.value }))}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        form.budget === b.value
                          ? "border-lime bg-lime/10 text-lime"
                          : "border-card-border bg-card-bg text-muted hover:border-lime/30"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="number"
                    value={form.budget}
                    placeholder="Or enter custom amount"
                    className={`w-full px-4 py-3 rounded-xl bg-card-bg border focus:outline-none text-sm transition-colors ${
                      budgetError ? "border-red-500 focus:border-red-500" : "border-card-border focus:border-lime"
                    }`}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, budget: e.target.value }));
                      setBudgetError("");
                    }}
                  />
                  <span className="text-xs text-muted whitespace-nowrap">$LOOSE</span>
                </div>
                {budgetError ? (
                  <p className="text-xs text-red-400 mt-2">{budgetError}</p>
                ) : (
                  <p className="text-xs text-muted/60 mt-2">
                    Minimum: {((MIN_BUDGET[form.riskLevel] || 1000000) / 1000000).toFixed(0)}M $LOOSE
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Stop Loss (%)
                  </label>
                  <input
                    type="number"
                    value={form.stopLoss}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, stopLoss: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Take Profit (%)
                  </label>
                  <input
                    type="number"
                    value={form.takeProfit}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        takeProfit: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border focus:border-lime focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card-bg border border-card-border">
                <div>
                  <div className="text-sm font-medium">Auto-Restart</div>
                  <div className="text-xs text-muted">
                    Automatically restart agent if it stops
                  </div>
                </div>
                <button
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      autoRestart: !f.autoRestart,
                    }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    form.autoRestart ? "bg-lime" : "bg-card-border"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      form.autoRestart ? "translate-x-5.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="btn-outline"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (!form.name || !form.budget) return;
                  if (!validateStrategyFields()) return;
                  const min = MIN_BUDGET[form.riskLevel] || 1000000;
                  if (Number(form.budget) < min) {
                    setBudgetError(`Minimum budget for ${form.riskLevel} risk is ${(min / 1000000).toFixed(0)}M $LOOSE`);
                    return;
                  }
                  setBudgetError("");
                  setStep(3);
                }}
                disabled={!form.name || !form.budget}
                className="btn-lime disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Review & Deploy</h2>
            <p className="text-sm text-muted mb-6">Confirm your agent configuration before deploying.</p>
            <div className="p-6 rounded-2xl bg-card-bg border border-card-border">
              <div className="space-y-4">
                {[
                  { label: "Agent Name", value: form.name },
                  { label: "Strategy", value: strategies.find((s) => s.id === form.strategy)?.name },
                  form.strategy === "arb" && form.tokenPairs.filter(Boolean).length > 0
                    ? { label: "Token Pairs", value: form.tokenPairs.filter(Boolean).join(", ") }
                    : null,
                  (form.strategy === "rebalancer" || form.strategy === "whale" || form.strategy === "sniper") && form.targetAddresses.filter(Boolean).length > 0
                    ? { label: form.strategy === "whale" ? "Wallets to Track" : form.strategy === "sniper" ? "Contract Addresses" : "Wallet Addresses", value: "" , addresses: form.targetAddresses.filter(Boolean) }
                    : null,
                  form.strategy === "sniper" && form.snipeAmount
                    ? { label: "Snipe Amount", value: `${form.snipeAmount} ETH` }
                    : null,
                  form.strategy === "custom" && form.customDescription
                    ? { label: "Strategy Logic", value: form.customDescription }
                    : null,
                  { label: "Budget", value: `${Number(form.budget).toLocaleString("en-US")} $LOOSE` },
                  { label: "Risk Level", value: form.riskLevel.charAt(0).toUpperCase() + form.riskLevel.slice(1) },
                  { label: "Stop Loss", value: `${form.stopLoss}%` },
                  { label: "Take Profit", value: `${form.takeProfit}%` },
                  { label: "Auto-Restart", value: form.autoRestart ? "Enabled" : "Disabled" },
                ].filter(Boolean).map((item: any) => (
                  <div key={item.label} className="flex justify-between py-1 border-b border-card-border/30 last:border-0">
                    <span className="text-sm text-muted">{item.label}</span>
                    {item.addresses ? (
                      <div className="text-right space-y-1">
                        {item.addresses.map((a: string, i: number) => (
                          <div key={i} className="text-sm font-medium font-mono text-xs">{a.slice(0, 6)}...{a.slice(-4)}</div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm font-medium">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-lime/5 border border-lime/20 mt-6 flex items-start gap-3">
                <svg width="16" height="16" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
                </svg>
                <p className="text-xs text-lime/80">
                  Deploying will lock {Number(form.budget).toLocaleString("en-US")} $LOOSE as collateral. Fully refundable when you stop the agent.
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(2)} className="btn-outline">
                Back
              </button>
              <button onClick={() => setShowWallet(true)} className="btn-lime">
                Deploy Agent
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {showWallet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-sm mx-4 p-6 rounded-2xl bg-[#100E17] border border-card-border shadow-2xl">
              {deployed ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" fill="none" stroke="#77FF33" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Agent Deployed!</h3>
                  <p className="text-sm text-muted mb-6">
                    Your agent is now live and executing on Robinhood Chain.
                  </p>
                  <Link href="/dashboard" className="btn-lime w-full justify-center">
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Confirm Transaction</h3>
                    <button
                      onClick={() => { setShowWallet(false); setDeploying(false); }}
                      className="w-8 h-8 rounded-lg border border-card-border flex items-center justify-center text-muted hover:text-white transition-colors"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Action</span>
                      <span className="font-medium">Deploy Agent</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Collateral</span>
                      <span className="font-medium">{Number(form.budget).toLocaleString("en-US")} $LOOSE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Gas Fee</span>
                      <span className="font-medium text-lime">Free</span>
                    </div>
                    <div className="border-t border-card-border pt-3 flex justify-between text-sm">
                      <span className="text-muted">Network</span>
                      <span className="font-medium">Robinhood Chain</span>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      setDeploying(true);
                      const strategy = strategies.find((s) => s.id === form.strategy);
                      await addAgent({
                        name: form.name,
                        strategy: form.strategy,
                        strategyName: strategy?.name || "Custom",
                        budget: form.budget,
                        riskLevel: form.riskLevel,
                        stopLoss: form.stopLoss,
                        takeProfit: form.takeProfit,
                        autoRestart: form.autoRestart,
                        ...(form.targetAddresses.filter(Boolean).length > 0 && { targetAddress: form.targetAddresses.filter(Boolean).join(", ") }),
                        ...(form.tokenPairs.filter(Boolean).length > 0 && { tokenPair: form.tokenPairs.filter(Boolean).join(", ") }),
                        ...(form.preferredPool && { preferredPool: form.preferredPool }),
                        ...(form.customDescription && { customDescription: form.customDescription }),
                        ...(form.snipeAmount && { snipeAmount: form.snipeAmount }),
                      });
                      setDeploying(false);
                      setDeployed(true);
                      toast(`${form.name} deployed successfully`);
                    }}
                    disabled={deploying}
                    className="btn-lime w-full justify-center disabled:opacity-60"
                  >
                    {deploying ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                          <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Confirming...
                      </>
                    ) : (
                      "Approve & Deploy"
                    )}
                  </button>

                  <p className="text-[10px] text-muted/60 text-center mt-3">
                    This will require wallet signature approval
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
