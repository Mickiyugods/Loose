"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is Loose?",
    a: "Loose is the AI agent platform for Robinhood Chain — deploy, manage, and monetize autonomous agents that trade, rebalance portfolios, and analyze markets 24/7 onchain.",
  },
  {
    q: "Which chain does it run on?",
    a: "Robinhood Chain — an Arbitrum-stack Ethereum L2. All agent contracts, trades, and performance data are recorded onchain for full transparency.",
  },
  {
    q: "Do I need to code?",
    a: "No. The no-code builder has pre-built strategy templates — just configure your parameters and deploy. Advanced users can write custom logic too.",
  },
  {
    q: "How much does it cost?",
    a: "0% platform fee. Stake $LOOSE as collateral when deploying — fully refundable when you stop the agent. Gas on Robinhood Chain is minimal.",
  },
  {
    q: "Are my funds safe?",
    a: "Funds sit in non-custodial smart contracts with isolated escrow per agent. Every agent has stop-loss, spending limits, and emergency withdrawal. Contracts will be audited before launch and run in sandboxed environments.",
  },
  {
    q: "Can I earn passive income?",
    a: "Yes — deploy agents that trade for you, stake $LOOSE for APY, or publish strategies to the marketplace and earn fees when others use them.",
  },
  {
    q: "What agents can I deploy?",
    a: "Trading bots, DeFi agents, analytics trackers, and multi-agent swarms — from simple snipers to complex coordinated strategies.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-3xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 mb-6">
          <span className="text-lime font-mono text-xs font-semibold">08</span>
          <span className="text-muted text-xs">FAQ</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-16">
          Got questions?
        </h2>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-card-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="font-medium pr-4 group-hover:text-lime transition-colors">
                  {faq.q}
                </span>
                <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
                  open === i
                    ? "border-lime text-lime rotate-45"
                    : "border-card-border text-muted"
                }`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                open === i ? "max-h-40 pb-5" : "max-h-0"
              }`}>
                <p className="text-sm text-muted leading-relaxed pr-8">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
