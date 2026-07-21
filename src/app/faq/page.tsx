"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

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

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">
              <span className="lime-gradient">Frequently Asked Questions</span>
            </h1>
            <p className="text-muted max-w-lg mx-auto">
              Everything you need to know about Loose and AI agents on Robinhood Chain.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i}>
              <div className="border-b border-card-border">
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
