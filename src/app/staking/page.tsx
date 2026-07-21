"use client";

import { useState } from "react";
import { useWallet } from "@/components/wallet-provider";
import Link from "next/link";

const pools = [
  {
    name: "LOOSE Staking",
    apy: "TBA",
    tvl: "—",
    reward: "LOOSE",
    lockPeriod: "No Lock",
    desc: "Stake $LOOSE to earn rewards and boost your agent performance multiplier.",
  },
  {
    name: "LOOSE-USDC LP",
    apy: "TBA",
    tvl: "—",
    reward: "LOOSE",
    lockPeriod: "7 Days",
    desc: "Provide liquidity to the LOOSE-USDC pool and earn enhanced rewards.",
  },
  {
    name: "Agent Vault",
    apy: "TBA",
    tvl: "—",
    reward: "LOOSE + Boost",
    lockPeriod: "30 Days",
    desc: "Lock $LOOSE for 30 days to unlock premium agent strategies and higher performance caps.",
  },
];

export default function StakingPage() {
  const { isConnected, connect } = useWallet();
  const [selectedPool, setSelectedPool] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">
            Stake <span className="lime-gradient">$LOOSE</span> & Earn
          </h1>
          <p className="text-muted max-w-lg mx-auto">
            Lock your $LOOSE tokens to earn rewards, boost your agent performance,
            and participate in governance.
          </p>
        </div>

        {!isConnected ? (
          <div className="max-w-md mx-auto text-center">
            <div className="p-8 rounded-2xl bg-card-bg border border-card-border">
              <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="6" width="20" height="14" rx="3" />
                  <path d="M16 12.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#77FF33" />
                  <path d="M6 6V5a3 3 0 013-3h6a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Connect Wallet</h2>
              <p className="text-sm text-muted mb-6">
                Connect your wallet to view staking pools and start earning.
              </p>
              <button onClick={connect} className="btn-lime w-full justify-center">
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-lime/5 to-transparent border border-lime/20 mb-8 text-center">
              <div className="w-12 h-12 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Staking Coming Soon</h3>
              <p className="text-sm text-muted max-w-md mx-auto mb-4">
                Staking pools will be activated after $LOOSE token launch. APY rates and staking tiers will be announced before activation.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-lime">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                Awaiting token deployment
              </div>
            </div>

            <div className="space-y-4">
              {pools.map((pool, i) => (
                <div
                  key={pool.name}
                  className={`rounded-2xl bg-card-bg border transition-all ${
                    selectedPool === i
                      ? "border-lime/30"
                      : "border-card-border"
                  }`}
                >
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setSelectedPool(selectedPool === i ? null : i)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center">
                          <svg width="24" height="24" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M14.5 9a2.5 2.5 0 00-5 0c0 2.5 5 2.5 5 5a2.5 2.5 0 01-5 0M12 6v12" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold">{pool.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
                            <span>Reward: {pool.reward}</span>
                            <span>&middot;</span>
                            <span>Lock: {pool.lockPeriod}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-xl font-bold text-muted">{pool.apy}</div>
                          <div className="text-[10px] text-muted">APY</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-muted">{pool.tvl}</div>
                          <div className="text-[10px] text-muted">TVL</div>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`text-muted transition-transform ${
                            selectedPool === i ? "rotate-180" : ""
                          }`}
                        >
                          <path d="M4 6l4 4 4-4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {selectedPool === i && (
                    <div className="px-5 pb-5 border-t border-card-border pt-4">
                      <p className="text-sm text-muted mb-4">{pool.desc}</p>
                      <button
                        disabled
                        className="w-full py-3 rounded-xl bg-card-border text-muted text-sm font-medium cursor-not-allowed"
                      >
                        Coming Soon — Awaiting Token Launch
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/dashboard" className="text-sm text-lime hover:text-lime/80 transition-colors">
                &larr; Back to Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
