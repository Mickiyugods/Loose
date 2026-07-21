"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { useWallet } from "./wallet-provider";

export interface Agent {
  id: string;
  name: string;
  strategy: string;
  strategyName: string;
  budget: string;
  riskLevel: string;
  stopLoss: string;
  takeProfit: string;
  autoRestart: boolean;
  targetAddress?: string;
  tokenPair?: string;
  preferredPool?: string;
  customDescription?: string;
  status: "running" | "paused" | "stopped";
  pnl: number;
  trades: number;
  uptime: string;
  createdAt: number;
}

export interface AgentNotification {
  id: string;
  agentId: string;
  agentName: string;
  type: "stop_loss" | "take_profit" | "stopped" | "restarted" | "ai_decision";
  message: string;
  timestamp: number;
}

export interface TradeLog {
  id: string;
  agentId: string;
  action: string;
  confidence: number;
  reason: string;
  pnlDelta: number;
  timestamp: number;
}

interface AgentContextType {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id" | "status" | "pnl" | "trades" | "uptime" | "createdAt">) => Promise<Agent>;
  getAgent: (id: string) => Agent | undefined;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  removeAgent: (id: string) => void;
  totalPnl: string;
  totalTrades: number;
  activeCount: number;
  notifications: AgentNotification[];
  dismissNotification: (id: string) => void;
  tradeLogs: TradeLog[];
}

const AgentContext = createContext<AgentContextType>({
  agents: [],
  addAgent: async () => ({} as Agent),
  getAgent: () => undefined,
  updateAgent: () => {},
  removeAgent: () => {},
  totalPnl: "$0",
  totalTrades: 0,
  activeCount: 0,
  notifications: [],
  dismissNotification: () => {},
  tradeLogs: [],
});

export function useAgents() {
  return useContext(AgentContext);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getUptime(createdAt: number): string {
  const diff = Date.now() - createdAt;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m ${secs}s`;
}

function formatPnl(val: number): string {
  return val >= 0 ? `+${val.toFixed(1)}%` : `${val.toFixed(1)}%`;
}

export function AgentProvider({ children }: { children: ReactNode }) {
  const { address } = useWallet();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [tick, setTick] = useState(0);
  const [notifications, setNotifications] = useState<AgentNotification[]>([]);
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);
  const thinkInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const addNotification = useCallback((n: Omit<AgentNotification, "id" | "timestamp">) => {
    setNotifications((prev) => [{
      ...n,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      timestamp: Date.now(),
    }, ...prev].slice(0, 20));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Load agents from Supabase
  useEffect(() => {
    if (!address) {
      setAgents([]);
      setLoaded(true);
      return;
    }

    async function load() {
      const { data } = await supabase
        .from("agents")
        .select("*")
        .eq("wallet_address", address)
        .order("created_at", { ascending: false });

      if (data) {
        setAgents(data.map((row: any) => ({
          id: row.id,
          name: row.name,
          strategy: row.strategy,
          strategyName: row.strategy_name,
          budget: row.budget,
          riskLevel: row.risk_level,
          stopLoss: row.stop_loss,
          takeProfit: row.take_profit,
          autoRestart: row.auto_restart,
          targetAddress: row.target_address,
          tokenPair: row.token_pair,
          preferredPool: row.preferred_pool,
          customDescription: row.custom_description,
          status: row.status,
          pnl: row.pnl || 0,
          trades: row.trades || 0,
          uptime: "0m 0s",
          createdAt: row.created_at,
        })));
      }
      setLoaded(true);
    }

    load();
  }, [address]);

  // AI thinking loop — ask AI for decisions every 30s for running agents
  useEffect(() => {
    if (thinkInterval.current) clearInterval(thinkInterval.current);

    thinkInterval.current = setInterval(async () => {
      const running = agents.filter((a) => a.status === "running");
      if (running.length === 0) return;

      for (const agent of running) {
        try {
          const res = await fetch("/api/agent/think", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              strategy: agent.strategy,
              tokenPair: agent.tokenPair || "LOOSE/USDC",
              riskLevel: agent.riskLevel,
              context: {
                currentPnl: agent.pnl,
                trades: agent.trades,
                budget: agent.budget,
                uptime: getUptime(agent.createdAt),
              },
            }),
          });

          if (!res.ok) continue;

          const decision = await res.json();

          if (decision.action === "buy" || decision.action === "sell") {
            const pnlDelta = decision.action === "buy"
              ? (Math.random() * 2 - 0.5) * (decision.confidence / 100)
              : (Math.random() * 1.5 - 0.8) * (decision.confidence / 100);

            const newPnl = Math.round((agent.pnl + pnlDelta) * 10) / 10;
            const newTrades = agent.trades + 1;

            const sl = Number(agent.stopLoss);
            const tp = Number(agent.takeProfit);

            let newStatus = agent.status;

            if (sl && newPnl <= -sl) {
              addNotification({ agentId: agent.id, agentName: agent.name, type: "stop_loss", message: `Stop Loss triggered at ${newPnl.toFixed(1)}%` });
              newStatus = "stopped";
            } else if (tp && newPnl >= tp) {
              addNotification({ agentId: agent.id, agentName: agent.name, type: "take_profit", message: `Take Profit reached at +${newPnl.toFixed(1)}%` });
              newStatus = "stopped";
            }

            addNotification({
              agentId: agent.id,
              agentName: agent.name,
              type: "ai_decision",
              message: `${decision.action.toUpperCase()}: ${decision.reason} (${decision.confidence}% confidence)`,
            });

            setTradeLogs((prev) => [{
              id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
              agentId: agent.id,
              action: decision.action,
              confidence: decision.confidence,
              reason: decision.reason,
              pnlDelta: pnlDelta,
              timestamp: Date.now(),
            }, ...prev].slice(0, 100));

            // Update local state
            setAgents((prev) => prev.map((a) =>
              a.id === agent.id ? { ...a, pnl: newPnl, trades: newTrades, status: newStatus as any } : a
            ));

            // Update Supabase
            await supabase.from("agents").update({
              pnl: newPnl,
              trades: newTrades,
              status: newStatus,
            }).eq("id", agent.id);

            // Log decision
            await supabase.from("agent_logs").insert({
              agent_id: agent.id,
              action: decision.action,
              confidence: decision.confidence,
              reason: decision.reason,
            });
          }
        } catch {
          // Skip on error
        }
      }

      setTick((t) => t + 1);
    }, 30000);

    return () => {
      if (thinkInterval.current) clearInterval(thinkInterval.current);
    };
  }, [agents, addNotification]);

  const addAgent = useCallback(
    async (data: Omit<Agent, "id" | "status" | "pnl" | "trades" | "uptime" | "createdAt">) => {
      const agent: Agent = {
        ...data,
        id: generateId(),
        status: "running",
        pnl: 0,
        trades: 0,
        uptime: "0m 0s",
        createdAt: Date.now(),
      };

      setAgents((prev) => [agent, ...prev]);

      // Save to Supabase
      await supabase.from("agents").insert({
        id: agent.id,
        wallet_address: address,
        name: agent.name,
        strategy: agent.strategy,
        strategy_name: agent.strategyName,
        budget: agent.budget,
        risk_level: agent.riskLevel,
        stop_loss: agent.stopLoss,
        take_profit: agent.takeProfit,
        auto_restart: agent.autoRestart,
        target_address: agent.targetAddress,
        token_pair: agent.tokenPair,
        preferred_pool: agent.preferredPool,
        custom_description: agent.customDescription,
        status: agent.status,
        pnl: agent.pnl,
        trades: agent.trades,
        created_at: agent.createdAt,
      });

      return agent;
    },
    [address]
  );

  const getAgent = useCallback(
    (id: string) => agents.find((a) => a.id === id),
    [agents]
  );

  const updateAgent = useCallback((id: string, updates: Partial<Agent>) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );

    // Sync to Supabase
    const dbUpdates: Record<string, any> = {};
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.pnl !== undefined) dbUpdates.pnl = updates.pnl;
    if (updates.trades !== undefined) dbUpdates.trades = updates.trades;
    if (Object.keys(dbUpdates).length > 0) {
      supabase.from("agents").update(dbUpdates).eq("id", id).then(() => {});
    }
  }, []);

  const removeAgent = useCallback((id: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
    supabase.from("agents").delete().eq("id", id).then(() => {});
  }, []);

  const activeCount = agents.filter((a) => a.status === "running").length;
  const totalTrades = agents.reduce((sum, a) => sum + a.trades, 0);
  const pnlSum = agents.reduce((sum, a) => sum + a.pnl, 0);
  const totalPnl = formatPnl(pnlSum);

  // 1-second tick for real-time uptime
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  void tick;
  const liveAgents = agents.map((a) => ({
    ...a,
    uptime: getUptime(a.createdAt),
  }));

  return (
    <AgentContext.Provider
      value={{
        agents: liveAgents,
        addAgent,
        getAgent: (id) => liveAgents.find((a) => a.id === id),
        updateAgent,
        removeAgent,
        totalPnl,
        totalTrades,
        activeCount,
        notifications,
        dismissNotification,
        tradeLogs,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}
