"use client";

import { use, useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAgents } from "@/components/agent-provider";
import { toast } from "@/components/toast-provider";

function generateLogs(agentName: string) {
  return [
    { time: "now", level: "info", msg: `Scanning for opportunities...` },
    { time: "3s ago", level: "success", msg: `Trade executed successfully` },
    { time: "15s ago", level: "info", msg: `Monitoring active positions` },
    { time: "30s ago", level: "warn", msg: "Gas price elevated, optimizing route" },
    { time: "1m ago", level: "info", msg: `${agentName} initialized and running` },
    { time: "2m ago", level: "success", msg: "Connected to Robinhood Chain RPC" },
  ];
}

const EVM_REGEX = /^0x[a-fA-F0-9]{40}$/;
const MAX_CHART_POINTS = 30;

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { agents, updateAgent, removeAgent, tradeLogs } = useAgents();
  const agent = agents.find((a) => a.id === id);

  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    targetAddress: "",
    tokenPair: "",
    budget: "",
    stopLoss: "",
    takeProfit: "",
    autoRestart: true,
    preferredPool: "",
  });
  const [walletInputs, setWalletInputs] = useState<string[]>([""]);
  const [confirmStop, setConfirmStop] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Dynamic PnL chart - track pnl over time
  const pnlHistory = useRef<number[]>([]);
  useEffect(() => {
    if (!agent) return;
    pnlHistory.current = [...pnlHistory.current, agent.pnl].slice(-MAX_CHART_POINTS);
  }, [agent?.pnl, agent]);

  const agentTradeLogs = tradeLogs.filter((l) => l.agentId === id);
  const logs = useMemo(() => generateLogs(agent?.name || "Agent"), [agent?.name]);

  function openEdit() {
    if (!agent) return;
    const addrs = agent.targetAddress ? agent.targetAddress.split(",").map(s => s.trim()).filter(Boolean) : [];
    setWalletInputs(addrs.length > 0 ? addrs : [""]);
    setEditForm({
      name: agent.name,
      targetAddress: agent.targetAddress || "",
      tokenPair: agent.tokenPair || "",
      budget: agent.budget,
      stopLoss: agent.stopLoss,
      takeProfit: agent.takeProfit,
      autoRestart: agent.autoRestart,
      preferredPool: agent.preferredPool || "",
    });
    setEditing(true);
  }

  function saveEdit() {
    if (!agent) return;
    const validWallets = walletInputs.filter(w => EVM_REGEX.test(w.trim()));
    updateAgent(agent.id, {
      name: editForm.name || agent.name,
      targetAddress: validWallets.join(","),
      tokenPair: editForm.tokenPair,
      budget: editForm.budget || agent.budget,
      stopLoss: editForm.stopLoss,
      takeProfit: editForm.takeProfit,
      autoRestart: editForm.autoRestart,
      preferredPool: editForm.preferredPool,
    });
    setEditing(false);
    toast("Agent settings saved");
  }

  function addWalletField() {
    setWalletInputs(prev => [...prev, ""]);
  }

  function removeWalletField(idx: number) {
    setWalletInputs(prev => prev.filter((_, i) => i !== idx));
  }

  function handleDelete() {
    if (!agent) return;
    toast(`${agent.name} deleted`, "error");
    removeAgent(agent.id);
    router.push("/dashboard");
  }

  function handleStop() {
    if (!agent) return;
    updateAgent(agent.id, { status: "stopped" });
    setConfirmStop(false);
    toast(`${agent.name} stopped`, "error");
  }

  if (!agent) {
    return (
      <div className="min-h-screen pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
          <p className="text-muted mb-6">This agent doesn&apos;t exist or has been removed.</p>
          <Link href="/dashboard" className="btn-lime inline-flex text-sm !py-2">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isSniper = agent.strategy === "sniper";
  const allAddresses = agent.targetAddress ? agent.targetAddress.split(",").map(s => s.trim()).filter(Boolean) : [];
  const wallets = isSniper ? [] : allAddresses;
  const cas = isSniper ? allAddresses : [];
  const tokenPairs = agent.tokenPair ? agent.tokenPair.split(",").map(s => s.trim()).filter(Boolean) : [];
  const hasWallets = wallets.length > 0;
  const hasCAs = cas.length > 0;
  const hasPairs = tokenPairs.length > 0;
  const pnlFormatted = agent.pnl >= 0 ? `+${agent.pnl.toFixed(1)}%` : `${agent.pnl.toFixed(1)}%`;
  const budgetNum = Number(agent.budget);
  const pnlDollar = (budgetNum * agent.pnl) / 100;
  const pnlDollarStr = pnlDollar >= 0 ? `+$${pnlDollar.toFixed(0)}` : `-$${Math.abs(pnlDollar).toFixed(0)}`;
  const winRate = agent.trades > 0 ? `${Math.min(Math.floor(50 + agent.pnl * 1.5), 95)}%` : "—";
  const avgTrade = agent.trades > 0 ? `$${(pnlDollar / Math.max(agent.trades, 1)).toFixed(2)}` : "—";

  const showWalletLabel = agent.strategy === "whale" || hasWallets;
  const showCALabel = isSniper || hasCAs;

  const statCards = [
    { label: "Total PnL", value: pnlDollarStr, highlight: true },
    { label: "PnL %", value: pnlFormatted, highlight: true },
    { label: "Win Rate", value: winRate },
    { label: "Total Trades", value: String(agent.trades) },
    { label: "Uptime", value: agent.uptime },
    { label: "Budget", value: `${Number(agent.budget).toLocaleString("en-US")} $LOOSE` },
    { label: "Avg Trade", value: avgTrade, highlight: true },
    { label: "Strategy", value: agent.strategyName },
  ];

  // Dynamic chart data
  const chartData = pnlHistory.current.length > 1 ? pnlHistory.current : [0, agent.pnl];
  const chartMin = Math.min(...chartData);
  const chartMax = Math.max(...chartData);
  const chartRange = chartMax - chartMin || 1;

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <Link
            href="/dashboard"
            className="text-muted hover:text-white transition-colors self-start"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold truncate">{agent.name}</h1>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                  agent.status === "running"
                    ? "bg-lime/10 text-lime"
                    : agent.status === "paused"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === "running"
                      ? "bg-lime animate-pulse"
                      : agent.status === "paused"
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                />
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-muted">
              {agent.strategyName}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={openEdit}
              className="px-3 sm:px-4 py-2 rounded-xl border border-card-border text-sm font-medium text-muted hover:text-white hover:border-lime/30 transition-colors"
            >
              Edit
            </button>
            {agent.status === "running" ? (
              <button
                onClick={() => { updateAgent(agent.id, { status: "paused" }); toast(`${agent.name} paused`, "info"); }}
                className="px-3 sm:px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-400 text-sm font-medium hover:bg-yellow-500/10 transition-colors"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={() => { updateAgent(agent.id, { status: "running" }); toast(`${agent.name} resumed`); }}
                className="btn-lime text-sm !py-2"
              >
                Start
              </button>
            )}
            {agent.status !== "stopped" && (
              <button
                onClick={() => setConfirmStop(true)}
                className="px-3 sm:px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
              >
                Stop
              </button>
            )}
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-3 sm:px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
              title="Delete Agent"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stop Confirmation Modal */}
        {confirmStop && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#0B0911] border border-card-border p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 9v4m0 4h.01M3 12l9-9 9 9-9 9-9-9z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Stop Agent?</h3>
              <p className="text-sm text-muted mb-6">
                Are you sure you want to stop <span className="text-white font-medium">{agent.name}</span>? The agent will cease all trading activity.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmStop(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-card-border text-sm font-medium text-muted hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStop}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Stop Agent
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#0B0911] border border-card-border p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Delete Agent?</h3>
              <p className="text-sm text-muted mb-2">
                This will permanently remove <span className="text-white font-medium">{agent.name}</span> and all its data.
              </p>
              <p className="text-xs text-red-400 mb-6">
                Budget of {Number(agent.budget).toLocaleString("en-US")} $LOOSE will be returned to your available balance.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-card-border text-sm font-medium text-muted hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Delete Agent
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-[#0B0911] border border-card-border p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Edit Agent</h2>
                <button
                  onClick={() => setEditing(false)}
                  className="text-muted hover:text-white transition-colors"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs text-muted mb-1.5 block">Agent Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border text-sm focus:outline-none focus:border-lime/30"
                  />
                </div>

                {(showWalletLabel || showCALabel) && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-muted">
                        {isSniper ? "Contract Addresses" : "Wallets to Track"}
                      </label>
                      <button
                        type="button"
                        onClick={addWalletField}
                        className="text-xs text-lime hover:text-lime/80 transition-colors"
                      >
                        + Add {isSniper ? "CA" : "Wallet"}
                      </button>
                    </div>
                    <div className="space-y-2">
                      {walletInputs.map((w, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={w}
                            onChange={(e) => {
                              const next = [...walletInputs];
                              next[i] = e.target.value;
                              setWalletInputs(next);
                            }}
                            placeholder={isSniper ? "0x... contract address" : "0x... wallet address"}
                            className={`flex-1 px-4 py-3 rounded-xl bg-card-bg border text-sm font-mono focus:outline-none focus:border-lime/30 ${
                              w && !EVM_REGEX.test(w.trim()) ? "border-red-500/50" : "border-card-border"
                            }`}
                          />
                          {walletInputs.length > 1 && (
                            <button
                              onClick={() => removeWalletField(i)}
                              className="px-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(hasPairs || agent.strategy === "arb" || agent.strategy === "rebalancer") && (
                  <div>
                    <label className="text-xs text-muted mb-1.5 block">Token Pairs (comma separated)</label>
                    <input
                      type="text"
                      value={editForm.tokenPair}
                      onChange={(e) => setEditForm(f => ({ ...f, tokenPair: e.target.value }))}
                      placeholder="LOOSE/USDC, RHOOD/USDC"
                      className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border text-sm focus:outline-none focus:border-lime/30"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs text-muted mb-1.5 block">Budget ($LOOSE)</label>
                  <input
                    type="number"
                    value={editForm.budget}
                    onChange={(e) => setEditForm(f => ({ ...f, budget: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border text-sm focus:outline-none focus:border-lime/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted mb-1.5 block">Stop Loss (%)</label>
                    <input
                      type="number"
                      value={editForm.stopLoss}
                      onChange={(e) => setEditForm(f => ({ ...f, stopLoss: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border text-sm focus:outline-none focus:border-lime/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted mb-1.5 block">Take Profit (%)</label>
                    <input
                      type="number"
                      value={editForm.takeProfit}
                      onChange={(e) => setEditForm(f => ({ ...f, takeProfit: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border text-sm focus:outline-none focus:border-lime/30"
                    />
                  </div>
                </div>

                {agent.preferredPool !== undefined && (
                  <div>
                    <label className="text-xs text-muted mb-1.5 block">Preferred Pool</label>
                    <input
                      type="text"
                      value={editForm.preferredPool}
                      onChange={(e) => setEditForm(f => ({ ...f, preferredPool: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-card-bg border border-card-border text-sm focus:outline-none focus:border-lime/30"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between p-4 rounded-xl bg-card-bg border border-card-border">
                  <div>
                    <div className="text-sm font-medium">Auto-Restart</div>
                    <div className="text-xs text-muted">Automatically restart agent if it stops</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditForm(f => ({ ...f, autoRestart: !f.autoRestart }))}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      editForm.autoRestart ? "bg-lime" : "bg-card-border"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        editForm.autoRestart ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-card-border text-sm font-medium text-muted hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="flex-1 btn-lime justify-center !py-3"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {(hasWallets || hasCAs || hasPairs || agent.preferredPool || agent.customDescription) && (
          <div className="p-4 sm:p-5 rounded-2xl bg-card-bg border border-card-border mb-6">
            {hasWallets && (
              <div className="mb-4 last:mb-0">
                <h3 className="text-xs text-muted mb-2 uppercase tracking-wider">Tracked Wallets ({wallets.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {wallets.map((w, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime/5 border border-lime/10 font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                      {w.slice(0, 6)}...{w.slice(-4)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {hasCAs && (
              <div className="mb-4 last:mb-0">
                <h3 className="text-xs text-muted mb-2 uppercase tracking-wider">Contract Addresses ({cas.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {cas.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime/5 border border-lime/10 font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                      {c.slice(0, 6)}...{c.slice(-4)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {hasPairs && (
              <div className="mb-4 last:mb-0">
                <h3 className="text-xs text-muted mb-2 uppercase tracking-wider">Token Pairs ({tokenPairs.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {tokenPairs.map((p, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-lime/5 border border-lime/10 font-mono text-xs">
                      {p.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {agent.preferredPool && (
              <div className="mb-4 last:mb-0">
                <h3 className="text-xs text-muted mb-2 uppercase tracking-wider">Preferred Pool</h3>
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-lime/5 border border-lime/10 font-mono text-xs">
                  {agent.preferredPool}
                </span>
              </div>
            )}
            {agent.customDescription && (
              <div className="mb-4 last:mb-0">
                <h3 className="text-xs text-muted mb-2 uppercase tracking-wider">Strategy Description</h3>
                <p className="text-sm text-muted">{agent.customDescription}</p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {statCards.map((s) => (
            <div
              key={s.label}
              className="p-3 sm:p-4 rounded-2xl bg-card-bg border border-card-border"
            >
              <div className="text-[10px] sm:text-xs text-muted mb-1">{s.label}</div>
              <div
                className={`text-base sm:text-lg font-bold truncate ${
                  s.highlight && s.value.startsWith("+")
                    ? "text-lime"
                    : s.highlight && s.value.startsWith("-")
                    ? "text-red-400"
                    : ""
                }`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dynamic PnL Chart */}
          <div className="p-4 sm:p-6 rounded-2xl bg-card-bg border border-card-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold">PnL Chart</h2>
              <span className={`text-sm font-semibold ${agent.pnl >= 0 ? "text-lime" : "text-red-400"}`}>
                {pnlFormatted}
              </span>
            </div>
            <div className="h-48 relative">
              <svg width="100%" height="100%" viewBox={`0 0 ${chartData.length * 20} 200`} preserveAspectRatio="none" className="overflow-visible">
                {/* Zero line */}
                {chartMin < 0 && chartMax > 0 && (
                  <line
                    x1="0"
                    y1={200 - ((0 - chartMin) / chartRange) * 180 - 10}
                    x2={chartData.length * 20}
                    y2={200 - ((0 - chartMin) / chartRange) * 180 - 10}
                    stroke="#ffffff10"
                    strokeDasharray="4 4"
                  />
                )}
                {/* Area fill */}
                <defs>
                  <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={agent.pnl >= 0 ? "#77FF33" : "#ef4444"} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={agent.pnl >= 0 ? "#77FF33" : "#ef4444"} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,${200 - ((chartData[0] - chartMin) / chartRange) * 180 - 10} ${chartData.map((v, i) => `L${i * 20},${200 - ((v - chartMin) / chartRange) * 180 - 10}`).join(" ")} L${(chartData.length - 1) * 20},200 L0,200 Z`}
                  fill="url(#pnlGrad)"
                />
                {/* Line */}
                <polyline
                  points={chartData.map((v, i) => `${i * 20},${200 - ((v - chartMin) / chartRange) * 180 - 10}`).join(" ")}
                  fill="none"
                  stroke={agent.pnl >= 0 ? "#77FF33" : "#ef4444"}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Current point */}
                <circle
                  cx={(chartData.length - 1) * 20}
                  cy={200 - ((chartData[chartData.length - 1] - chartMin) / chartRange) * 180 - 10}
                  r="4"
                  fill={agent.pnl >= 0 ? "#77FF33" : "#ef4444"}
                  className="animate-pulse"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] text-muted mt-2">
              <span>Start</span>
              <span>{agent.uptime} ago</span>
              <span>Now</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-card-bg border border-card-border">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Agent Logs</h2>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-muted font-mono shrink-0">
                    {log.time}
                  </span>
                  <span
                    className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      log.level === "success"
                        ? "bg-lime/10 text-lime"
                        : log.level === "warn"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-muted">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-card-bg border border-card-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold">Trade History</h2>
            {agentTradeLogs.length > 0 && (
              <span className="text-xs text-muted">{agentTradeLogs.length} trades</span>
            )}
          </div>
          {agentTradeLogs.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-3">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              </div>
              <p className="text-sm text-muted">No trades yet. Agent is warming up...</p>
              <p className="text-xs text-muted/60 mt-1">AI decisions run every 30 seconds</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-3 px-2 text-xs text-muted font-medium">Time</th>
                    <th className="text-left py-3 px-2 text-xs text-muted font-medium">Action</th>
                    <th className="text-left py-3 px-2 text-xs text-muted font-medium">Confidence</th>
                    <th className="text-left py-3 px-2 text-xs text-muted font-medium">Reason</th>
                    <th className="text-right py-3 px-2 text-xs text-muted font-medium">PnL</th>
                  </tr>
                </thead>
                <tbody>
                  {agentTradeLogs.map((t) => {
                    const diff = Date.now() - t.timestamp;
                    const secs = Math.floor(diff / 1000);
                    const timeStr = secs < 60 ? `${secs}s ago` : secs < 3600 ? `${Math.floor(secs / 60)}m ago` : `${Math.floor(secs / 3600)}h ago`;
                    const pnlStr = t.pnlDelta >= 0 ? `+${t.pnlDelta.toFixed(2)}%` : `${t.pnlDelta.toFixed(2)}%`;
                    return (
                      <tr
                        key={t.id}
                        className="border-b border-card-border/50 hover:bg-lime/5 transition-colors"
                      >
                        <td className="py-3 px-2 text-muted text-xs">{timeStr}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              t.action === "buy"
                                ? "bg-lime/10 text-lime"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {t.action.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-card-border overflow-hidden">
                              <div
                                className="h-full rounded-full bg-lime"
                                style={{ width: `${t.confidence}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted">{t.confidence}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-xs text-muted max-w-[200px] truncate">{t.reason}</td>
                        <td
                          className={`py-3 px-2 text-right text-xs font-medium ${
                            t.pnlDelta >= 0 ? "text-lime" : "text-red-400"
                          }`}
                        >
                          {pnlStr}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
