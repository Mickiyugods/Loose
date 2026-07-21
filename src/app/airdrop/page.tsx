"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/components/wallet-provider";
import { useAgents } from "@/components/agent-provider";
import { toast } from "@/components/toast-provider";

const tasks = [
  {
    id: "connect",
    title: "Connect Wallet",
    desc: "Connect your wallet to Loose platform",
    points: 100,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="6" width="20" height="14" rx="3" />
        <path d="M16 12.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />
        <path d="M6 6V5a3 3 0 013-3h6a3 3 0 013 3v1" />
      </svg>
    ),
  },
  {
    id: "deploy",
    title: "Deploy Your First Agent",
    desc: "Create and deploy an AI agent on Robinhood Chain",
    points: 500,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: "trade10",
    title: "Execute 10 Trades",
    desc: "Let your agents complete at least 10 AI-powered trades",
    points: 750,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "trade100",
    title: "Execute 100 Trades",
    desc: "Let your agents complete at least 100 AI-powered trades",
    points: 2000,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "twitter",
    title: "Follow on Twitter",
    desc: "Follow @trylooseagent on Twitter/X",
    link: "https://x.com/trylooseagent",
    points: 200,
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "invite3",
    title: "Invite 3 Friends",
    desc: "Share your referral link and get 3 friends to join",
    points: 1500,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: "pnl50",
    title: "Achieve +50% PnL",
    desc: "Have an agent reach over 50% profit",
    points: 2000,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const tiers = [
  { name: "Bronze", min: 0, max: 999, color: "#CD7F32" },
  { name: "Silver", min: 1000, max: 2999, color: "#C0C0C0" },
  { name: "Gold", min: 3000, max: 5999, color: "#FFD700" },
  { name: "Diamond", min: 6000, max: Infinity, color: "#77FF33" },
];

export default function AirdropPage() {
  const { isConnected, address, connect } = useWallet();
  const { agents, totalTrades } = useAgents();
  const [manualCompleted, setManualCompleted] = useState<Set<string>>(new Set());
  const [verifying, setVerifying] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const completedTasks = new Set<string>(manualCompleted);
  if (isConnected) completedTasks.add("connect");
  if (agents.length > 0) completedTasks.add("deploy");
  if (totalTrades >= 10) completedTasks.add("trade10");
  if (totalTrades >= 100) completedTasks.add("trade100");
  if (agents.some((a) => a.pnl >= 50)) completedTasks.add("pnl50");

  const totalPoints = tasks
    .filter((t) => completedTasks.has(t.id))
    .reduce((s, t) => s + t.points, 0);

  const maxPoints = tasks.reduce((s, t) => s + t.points, 0);
  const progressPercent = (totalPoints / maxPoints) * 100;

  const currentTier = tiers.reduce((tier, t) => (totalPoints >= t.min ? t : tier), tiers[0]);

  const handleVerifyLink = (id: string, link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
    setVerifying(id);
    setTimeout(() => {
      setVerifying(null);
      setManualCompleted((s) => new Set(s).add(id));
    }, 3000);
  };

  const handleManualComplete = (id: string) => {
    if (id === "connect" && !isConnected) {
      connect();
      return;
    }
    setManualCompleted((s) => new Set(s).add(id));
  };

  const referralCode = isConnected && address ? `LOOSE-${address.slice(2, 8).toUpperCase()}` : "---";

  const handleCopyReferral = () => {
    try { navigator.clipboard.writeText(`https://looseagent.app/ref/${referralCode}`); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast("Referral link copied");
  };

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            $LOOSE <span className="lime-gradient">Airdrop</span>
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-lg mx-auto">
            Complete tasks, earn points, and qualify for the $LOOSE token airdrop on Robinhood Chain.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-card-bg border border-card-border text-center">
            <div className="text-xs text-muted mb-1">Your Points</div>
            <div className="text-xl sm:text-2xl font-bold text-lime">{totalPoints.toLocaleString("en-US")}</div>
          </div>
          <div className="p-4 rounded-2xl bg-card-bg border border-card-border text-center">
            <div className="text-xs text-muted mb-1">Tasks Done</div>
            <div className="text-xl sm:text-2xl font-bold">{completedTasks.size}/{tasks.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-card-bg border border-card-border text-center">
            <div className="text-xs text-muted mb-1">Your Tier</div>
            <div className="text-xl sm:text-2xl font-bold" style={{ color: currentTier.color }}>{currentTier.name}</div>
          </div>
          <div className="p-4 rounded-2xl bg-card-bg border border-card-border text-center">
            <div className="text-xs text-muted mb-1">Active Agents</div>
            <div className="text-xl sm:text-2xl font-bold text-lime">
              {agents.filter((a) => a.status === "running").length}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card-bg border border-card-border mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Airdrop Progress</span>
            <span className="text-sm text-muted">{totalPoints.toLocaleString("en-US")} / {maxPoints.toLocaleString("en-US")} pts</span>
          </div>
          <div className="h-3 rounded-full bg-[#1a1825] overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-lime/80 to-lime transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between">
            {tiers.map((t) => (
              <div key={t.name} className="text-center">
                <div
                  className={`text-xs font-semibold ${totalPoints >= t.min ? "opacity-100" : "opacity-40"}`}
                  style={{ color: t.color }}
                >
                  {t.name}
                </div>
                <div className="text-[10px] text-muted">{t.min.toLocaleString("en-US")}+</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-lime/5 to-transparent border border-lime/20 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1 flex items-center gap-2">
                <svg width="18" height="18" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
                Invite Friends — Earn 500 pts each
              </h3>
              <p className="text-xs text-muted">Share your referral link and earn bonus points for each friend who joins.</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-black/30 border border-lime/10 text-sm font-mono text-lime truncate">
                {isConnected ? `looseagent.app/ref/${referralCode}` : "Connect wallet first"}
              </div>
              <button
                onClick={handleCopyReferral}
                disabled={!isConnected}
                className="px-4 py-2.5 rounded-xl bg-lime text-black text-sm font-bold hover:bg-lime-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Airdrop Tasks</h2>
          <span className="text-xs text-muted">{completedTasks.size} of {tasks.length} completed</span>
        </div>

        <div className="space-y-3">
          {tasks.map((t) => {
            const done = completedTasks.has(t.id);
            const isAutoCompleted = ["connect", "deploy", "trade10", "trade100", "pnl50"].includes(t.id);
            return (
              <div
                key={t.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  done
                    ? "bg-lime/5 border-lime/20"
                    : "bg-card-bg border-card-border hover:border-lime/10"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      done ? "bg-lime/10 text-lime" : "bg-white/5 text-muted"
                    }`}>
                      {done ? (
                        <svg width="20" height="20" fill="none" stroke="#77FF33" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        t.icon
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${done ? "text-lime" : ""}`}>
                        {t.title}
                        {isAutoCompleted && !done && (
                          <span className="ml-2 text-[10px] text-muted font-normal px-1.5 py-0.5 rounded bg-white/5">Auto-track</span>
                        )}
                      </h3>
                      <p className="text-xs text-muted">{t.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pl-14 sm:pl-0">
                    <span className={`text-sm font-bold ${done ? "text-lime" : "text-white"}`}>
                      +{t.points.toLocaleString("en-US")} pts
                    </span>
                    {done ? (
                      <span className="px-3 py-1.5 rounded-lg bg-lime/10 text-lime text-xs font-medium flex items-center gap-1.5">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Completed
                      </span>
                    ) : verifying === t.id ? (
                      <span className="px-4 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs font-bold flex items-center gap-1.5">
                        <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                          <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Verifying...
                      </span>
                    ) : (t as any).link ? (
                      <button
                        onClick={() => handleVerifyLink(t.id, (t as any).link)}
                        className="px-4 py-1.5 rounded-lg bg-lime text-black text-xs font-bold hover:bg-lime-light transition-colors"
                      >
                        {t.id === "twitter" ? "Follow" : "Verify"}
                      </button>
                    ) : isAutoCompleted ? (
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 text-muted text-xs font-medium">
                        In Progress
                      </span>
                    ) : (
                      <button
                        onClick={() => handleManualComplete(t.id)}
                        className="px-4 py-1.5 rounded-lg bg-lime text-black text-xs font-bold hover:bg-lime-light transition-colors"
                      >
                        {t.id === "connect" ? "Connect" : "Verify"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-card-bg border border-card-border text-center">
          <p className="text-xs text-muted mb-2">Season 1</p>
          <div className="flex items-center justify-center gap-2 text-lime mb-3">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-sm font-semibold">Active — Earning Points</span>
          </div>
          <p className="text-xs text-muted/50">
            Points snapshot taken at season end. $LOOSE airdrop distributed within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
