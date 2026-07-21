"use client";

import { useState } from "react";
import Link from "next/link";
import { useWallet } from "@/components/wallet-provider";
import { useAgents } from "@/components/agent-provider";
import { toast } from "@/components/toast-provider";

const strategyIcons: Record<string, React.ReactNode> = {
  arb: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  rebalancer: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  whale: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 8v6m-3-3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  sniper: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  custom: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 14v7m-3.5-3.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const strategyToId: Record<string, string> = {
  "Arbitrage Scanner": "arb",
  "Portfolio Rebalancer": "rebalancer",
  "Whale Tracker": "whale",
  "Token Sniper": "sniper",
  "Custom Strategy": "custom",
};

const templates: Array<{ name: string; desc: string; category: string; risk: string; icon: React.ReactNode; comingSoon?: boolean }> = [
  {
    name: "Arbitrage Scanner",
    desc: "Capture cross-DEX price differences on Robinhood Chain",
    category: "Trading",
    risk: "Low",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Portfolio Rebalancer",
    desc: "Maintain target allocations and rebalance automatically",
    category: "DeFi",
    risk: "Low",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Whale Tracker",
    desc: "Mirror whale wallet trades with customizable delay and filters",
    category: "Analytics",
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
    name: "Token Sniper",
    desc: "Auto-detect and snipe new token launches on Robinhood Chain",
    category: "Trading",
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
    name: "Custom Strategy",
    desc: "Build your own agent with custom logic and parameters",
    category: "Custom",
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

type SortKey = "newest" | "pnl" | "trades" | "uptime";
type FilterStatus = "all" | "running" | "paused" | "stopped";

function StatIcon({ type }: { type: string }) {
  switch (type) {
    case "chart":
      return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16h16V4" />
        </svg>
      );
    case "locked":
      return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 118 0v4" />
        </svg>
      );
    case "available":
      return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9a2.5 2.5 0 00-5 0c0 2.5 5 2.5 5 5a2.5 2.5 0 01-5 0M12 6v12" />
        </svg>
      );
    case "trades":
      return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-card-border/50 rounded-lg animate-pulse" />
            <div className="h-4 w-32 bg-card-border/30 rounded mt-2 animate-pulse" />
          </div>
          <div className="h-10 w-36 bg-card-border/50 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card-bg border border-card-border">
              <div className="h-3 w-16 bg-card-border/40 rounded animate-pulse mb-3" />
              <div className="h-7 w-24 bg-card-border/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card-bg border border-card-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-card-border/40 animate-pulse" />
                <div className="flex-1">
                  <div className="h-5 w-40 bg-card-border/50 rounded animate-pulse mb-2" />
                  <div className="h-3 w-24 bg-card-border/30 rounded animate-pulse" />
                </div>
                <div className="h-8 w-20 bg-card-border/40 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isConnected, connect } = useWallet();
  const { agents, activeCount, totalPnl, totalTrades, updateAgent, notifications, dismissNotification } = useAgents();
  const [tab, setTab] = useState<"agents" | "marketplace">("agents");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [confirmStop, setConfirmStop] = useState<string | null>(null);

  const totalLocked = agents.reduce((sum, a) => sum + Number(a.budget), 0);
  const totalBalance = 0;
  const totalAvailable = totalBalance - totalLocked;

  const stats = [
    { label: "Active Agents", value: String(activeCount), icon: "bot" },
    { label: "Total PnL", value: totalPnl, icon: "chart" },
    { label: "Total Trades", value: totalTrades.toLocaleString("en-US"), icon: "trades" },
    { label: "Locked", value: totalLocked.toLocaleString("en-US"), icon: "locked", sub: "$LOOSE" },
    { label: "Available", value: totalAvailable.toLocaleString("en-US"), icon: "available", sub: "$LOOSE" },
  ];

  const filteredAgents = agents
    .filter((a) => filterStatus === "all" || a.status === filterStatus)
    .filter((a) => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.strategyName.toLowerCase().includes(search.toLowerCase()));
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case "pnl": return b.pnl - a.pnl;
      case "trades": return b.trades - a.trades;
      case "uptime": return a.createdAt - b.createdAt;
      default: return b.createdAt - a.createdAt;
    }
  });

  function handleStop(agentId: string) {
    setConfirmStop(agentId);
  }

  function confirmStopAgent() {
    if (confirmStop) {
      const name = agents.find(a => a.id === confirmStop)?.name;
      updateAgent(confirmStop, { status: "stopped" });
      setConfirmStop(null);
      toast(`${name || "Agent"} stopped`, "error");
    }
  }

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
              Connect your wallet to access the dashboard and manage your AI agents.
            </p>
            <button onClick={connect} className="btn-lime w-full justify-center mb-3">
              Connect Wallet
            </button>
            <Link href="/" className="text-sm text-muted hover:text-lime transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stopAgent = confirmStop ? agents.find(a => a.id === confirmStop) : null;

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted mt-1">
              Manage your AI agents on Robinhood Chain
            </p>
          </div>
          <Link href="/dashboard/create" className="btn-lime text-sm !py-2">
            + Deploy New Agent
          </Link>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="space-y-2 mb-6">
            {notifications.slice(0, 5).map((n) => (
              <div
                key={n.id}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border ${
                  n.type === "stop_loss"
                    ? "bg-red-500/5 border-red-500/20"
                    : n.type === "take_profit"
                    ? "bg-lime/5 border-lime/20"
                    : "bg-card-bg border-card-border"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    n.type === "stop_loss" ? "bg-red-500/10" : "bg-lime/10"
                  }`}>
                    {n.type === "stop_loss" ? (
                      <svg width="16" height="16" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 9v4m0 4h.01M3 12l9-9 9 9-9 9-9-9z" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="#77FF33" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium">{n.agentName}</span>
                    <span className="text-sm text-muted ml-2 hidden sm:inline">{n.message}</span>
                    <p className="text-sm text-muted sm:hidden truncate">{n.message}</p>
                    <span className="text-xs text-muted ml-2 hidden sm:inline">{timeAgo(n.timestamp)}</span>
                  </div>
                </div>
                <button
                  onClick={() => dismissNotification(n.id)}
                  className="text-muted hover:text-white transition-colors shrink-0"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Stat Cards - 5 cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-4 lg:p-5 rounded-2xl bg-card-bg border border-card-border"
            >
              <div className="flex items-center gap-3 mb-3">
                {s.icon === "bot" ? (
                  <img src="/icon.png" alt="Loose" className="w-10 h-10 lg:w-11 lg:h-11 object-contain drop-shadow-[0_0_8px_rgba(119,255,51,0.4)]" />
                ) : (
                  <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-lime/10 flex items-center justify-center text-lime">
                    <StatIcon type={s.icon} />
                  </div>
                )}
              </div>
              <div className="text-xl lg:text-2xl font-bold">
                {s.label === "Total PnL" ? (
                  <span className={s.value.startsWith("-") ? "text-red-400" : "text-lime"}>{s.value}</span>
                ) : (
                  s.value
                )}
              </div>
              <div className="text-[10px] lg:text-xs text-muted mt-1">
                {s.label}
                {"sub" in s && <span className="ml-1 text-lime/60">{s.sub}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex gap-1 p-1 bg-card-bg rounded-xl border border-card-border w-fit">
              <button
                onClick={() => setTab("agents")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === "agents"
                    ? "bg-lime text-black"
                    : "text-muted hover:text-white"
                }`}
              >
                My Agents
              </button>
              <button
                onClick={() => setTab("marketplace")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === "marketplace"
                    ? "bg-lime text-black"
                    : "text-muted hover:text-white"
                }`}
              >
                Marketplace
              </button>
            </div>

            {/* Filter, Sort & Search */}
            {tab === "agents" && agents.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search agents..."
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-card-bg border border-card-border text-xs text-white placeholder:text-muted focus:outline-none focus:border-lime/30 w-36 sm:w-44"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                  className="px-3 py-1.5 rounded-lg bg-card-bg border border-card-border text-xs text-muted focus:outline-none focus:border-lime/30"
                >
                  <option value="all">All Status</option>
                  <option value="running">Running</option>
                  <option value="paused">Paused</option>
                  <option value="stopped">Stopped</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="px-3 py-1.5 rounded-lg bg-card-bg border border-card-border text-xs text-muted focus:outline-none focus:border-lime/30"
                >
                  <option value="newest">Newest First</option>
                  <option value="pnl">Highest PnL</option>
                  <option value="trades">Most Trades</option>
                  <option value="uptime">Longest Uptime</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Stop Confirmation Modal */}
        {confirmStop && stopAgent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#0B0911] border border-card-border p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 9v4m0 4h.01M3 12l9-9 9 9-9 9-9-9z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Stop Agent?</h3>
              <p className="text-sm text-muted mb-6">
                Are you sure you want to stop <span className="text-white font-medium">{stopAgent.name}</span>? The agent will cease all trading activity.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmStop(null)}
                  className="flex-1 px-4 py-3 rounded-xl border border-card-border text-sm font-medium text-muted hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStopAgent}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Stop Agent
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "agents" ? (
          agents.length === 0 ? (
            <div className="p-10 rounded-2xl bg-card-bg border border-card-border text-center">
              <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4m-3-1h6" strokeLinecap="round" />
                  <circle cx="9" cy="15" r="1" fill="#77FF33" />
                  <circle cx="15" cy="15" r="1" fill="#77FF33" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">No Agents Yet</h3>
              <p className="text-sm text-muted mb-6 max-w-sm mx-auto">
                Deploy your first AI agent to start trading and earning on Robinhood Chain.
              </p>
              <Link href="/dashboard/create" className="btn-lime inline-flex">
                + Deploy Your First Agent
              </Link>
            </div>
          ) : sortedAgents.length === 0 ? (
            <div className="p-8 rounded-2xl bg-card-bg border border-card-border text-center">
              <p className="text-sm text-muted">No agents match this filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedAgents.map((agent) => {
                const statusColor =
                  agent.status === "running"
                    ? "bg-lime/10 text-lime"
                    : agent.status === "paused"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-red-500/10 text-red-400";
                const dotColor =
                  agent.status === "running"
                    ? "bg-lime animate-pulse"
                    : agent.status === "paused"
                    ? "bg-yellow-400"
                    : "bg-red-400";
                return (
                  <div
                    key={agent.id}
                    className="p-4 sm:p-5 rounded-2xl bg-card-bg border border-card-border hover:border-lime/20 transition-all"
                  >
                    {/* Mobile layout */}
                    <div className="sm:hidden">
                      <Link href={`/dashboard/agent/${agent.id}`} className="block mb-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-xl bg-lime/10 flex items-center justify-center text-lime shrink-0">
                            {strategyIcons[agent.strategy] || strategyIcons.custom}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm truncate">{agent.name}</h3>
                            <span className="text-[10px] text-muted">{agent.strategyName}</span>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor}`}>
                            <span className={`w-1 h-1 rounded-full ${dotColor}`} />
                            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                          </span>
                        </div>
                        {agent.targetAddress && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {agent.strategy === "sniper" && (
                              <span className="text-[10px] px-1 py-0.5 text-muted">CA:</span>
                            )}
                            {agent.targetAddress.split(",").slice(0, 2).map((addr, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-lime/5 text-muted font-mono">
                                {addr.trim().slice(0, 6)}...{addr.trim().slice(-4)}
                              </span>
                            ))}
                            {agent.targetAddress.split(",").length > 2 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime/5 text-muted">
                                +{agent.targetAddress.split(",").length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-xs">
                          <div>
                            <span className={`font-semibold ${agent.pnl >= 0 ? "text-lime" : "text-red-400"}`}>
                              {agent.pnl >= 0 ? `+${agent.pnl.toFixed(1)}%` : `${agent.pnl.toFixed(1)}%`}
                            </span>
                            <span className="text-[10px] text-muted ml-1">PnL</span>
                          </div>
                          <div>
                            <span className="font-semibold">{agent.trades}</span>
                            <span className="text-[10px] text-muted ml-1">Trades</span>
                          </div>
                          <div>
                            <span className="font-semibold">{agent.uptime}</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          {agent.status === "running" ? (
                            <button
                              onClick={() => { updateAgent(agent.id, { status: "paused" }); toast(`${agent.name} paused`, "info"); }}
                              className="w-7 h-7 rounded-lg border border-yellow-500/30 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                            >
                              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                            </button>
                          ) : (
                            <button
                              onClick={() => { updateAgent(agent.id, { status: "running" }); toast(`${agent.name} resumed`); }}
                              className="w-7 h-7 rounded-lg border border-lime/30 flex items-center justify-center text-lime hover:bg-lime/10 transition-colors"
                            >
                              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </button>
                          )}
                          {agent.status !== "stopped" && (
                            <button
                              onClick={() => handleStop(agent.id)}
                              className="w-7 h-7 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden sm:flex sm:items-center justify-between gap-4">
                      <Link
                        href={`/dashboard/agent/${agent.id}`}
                        className="flex items-center gap-4 flex-1 min-w-0"
                      >
                        <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center text-lime shrink-0">
                          {strategyIcons[agent.strategy] || strategyIcons.custom}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold">{agent.name}</h3>
                          <span className="text-xs text-muted">{agent.strategyName}</span>
                          {agent.targetAddress && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {agent.strategy === "sniper" && (
                                <span className="text-[10px] px-1.5 py-0.5 text-muted">CA:</span>
                              )}
                              {agent.targetAddress.split(",").slice(0, 3).map((addr, i) => (
                                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-lime/5 text-muted font-mono">
                                  {addr.trim().slice(0, 6)}...{addr.trim().slice(-4)}
                                </span>
                              ))}
                              {agent.targetAddress.split(",").length > 3 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime/5 text-muted">
                                  +{agent.targetAddress.split(",").length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                          {agent.tokenPair && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {agent.tokenPair.split(",").slice(0, 3).map((pair, i) => (
                                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-lime/5 text-muted font-mono">
                                  {pair.trim()}
                                </span>
                              ))}
                              {agent.tokenPair.split(",").length > 3 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime/5 text-muted">
                                  +{agent.tokenPair.split(",").length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="flex items-center gap-4 lg:gap-6 text-sm shrink-0">
                        <div className="text-center">
                          <div className={`font-semibold ${agent.pnl >= 0 ? "text-lime" : "text-red-400"}`}>
                            {agent.pnl >= 0 ? `+${agent.pnl.toFixed(1)}%` : `${agent.pnl.toFixed(1)}%`}
                          </div>
                          <div className="text-[10px] text-muted">PnL</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{agent.trades}</div>
                          <div className="text-[10px] text-muted">Trades</div>
                        </div>
                        <div className="text-center hidden md:block">
                          <div className="font-semibold">{agent.uptime}</div>
                          <div className="text-[10px] text-muted">Uptime</div>
                        </div>
                        <div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          {agent.status === "running" ? (
                            <button
                              onClick={(e) => { e.preventDefault(); updateAgent(agent.id, { status: "paused" }); toast(`${agent.name} paused`, "info"); }}
                              className="w-8 h-8 rounded-lg border border-yellow-500/30 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                              title="Pause"
                            >
                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="6" y="4" width="4" height="16" rx="1" />
                                <rect x="14" y="4" width="4" height="16" rx="1" />
                              </svg>
                            </button>
                          ) : (
                            <button
                              onClick={(e) => { e.preventDefault(); updateAgent(agent.id, { status: "running" }); toast(`${agent.name} resumed`); }}
                              className="w-8 h-8 rounded-lg border border-lime/30 flex items-center justify-center text-lime hover:bg-lime/10 transition-colors"
                              title="Start"
                            >
                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </button>
                          )}
                          {agent.status !== "stopped" && (
                            <button
                              onClick={(e) => { e.preventDefault(); handleStop(agent.id); }}
                              className="w-8 h-8 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors"
                              title="Stop"
                            >
                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="6" y="6" width="12" height="12" rx="2" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((t) => (
              <div
                key={t.name}
                className={`p-5 rounded-2xl bg-card-bg border border-card-border transition-all group relative ${
                  t.comingSoon ? "opacity-60" : "hover:border-lime/20"
                }`}
              >
                {t.comingSoon && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-semibold z-10">
                    Coming Soon
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg border border-card-border flex items-center justify-center text-muted group-hover:text-lime group-hover:border-lime/30 transition-all">
                    {t.icon}
                  </div>
                  {!(t.comingSoon) && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        t.risk === "High"
                          ? "bg-red-500/10 text-red-400"
                          : t.risk === "Medium"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : t.risk === "Low"
                          ? "bg-lime/10 text-lime"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {t.risk}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold mb-1">{t.name}</h3>
                <p className="text-sm text-muted mb-4 min-h-[40px]">{t.desc}</p>
                {t.comingSoon ? (
                  <div className="block w-full py-2 rounded-lg border border-card-border text-sm text-muted font-medium text-center cursor-not-allowed">
                    Coming Soon
                  </div>
                ) : (
                  <Link
                    href={`/dashboard/create?strategy=${strategyToId[t.name] || "custom"}`}
                    className="block w-full py-2 rounded-lg border border-lime/30 text-sm text-lime font-medium hover:bg-lime/10 transition-colors text-center"
                  >
                    Deploy Agent
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
