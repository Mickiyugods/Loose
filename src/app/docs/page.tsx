import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

const sections = [
  {
    title: "Getting Started",
    items: [
      {
        title: "What is Loose?",
        content:
          "Loose is a decentralized AI agent launchpad built on Robinhood Chain. It enables anyone to deploy, manage, and monetize autonomous AI agents that execute on-chain strategies 24/7. From token sniping to portfolio rebalancing, Loose agents handle it all.",
      },
      {
        title: "How to Connect",
        content:
          "Connect your wallet (MetaMask, WalletConnect, or any EVM-compatible wallet) to Robinhood Chain. Make sure you have $LOOSE tokens for deploying agents and gas fees.",
      },
      {
        title: "Your First Agent",
        content:
          "Navigate to Dashboard → Deploy New Agent. Choose a strategy template, configure your parameters (budget, risk level, stop loss), review the settings, and deploy. Your agent will start executing immediately.",
      },
    ],
  },
  {
    title: "Agent Types",
    items: [
      {
        title: "Trading Bots",
        content:
          "Automated trading agents that execute buy/sell strategies. Includes Token Snipers for new launches, Trend Followers for momentum trading, and Grid Bots for range-bound markets. All trades execute on Robinhood Chain DEXs.",
      },
      {
        title: "DeFi Agents",
        content:
          "DeFi management agents. Portfolio Rebalancers maintain target allocations automatically, and Arbitrage Scanners capture cross-DEX price differences across Robinhood Chain protocols.",
      },
      {
        title: "Analytics Agents",
        content:
          "Intelligence agents that monitor and analyze on-chain data. Whale Trackers mirror large wallet movements, Social Scanners track sentiment for alpha signals, and MEV Agents capture value from transaction ordering.",
      },
      {
        title: "Multi-Agent Swarms",
        content:
          "Compose multiple agents into coordinated swarms. A swarm can combine a Whale Tracker feeding signals to a Trading Bot, with a Risk Manager overseeing positions. Agents communicate via Loose's messaging protocol.",
      },
    ],
  },
  {
    title: "AI Decision Engine",
    items: [
      {
        title: "How AI Decisions Work",
        content:
          "Every running agent sends its current context (strategy type, PnL, trade count, risk level) to the AI engine every 30 seconds. The engine returns a structured decision — buy, sell, or hold — with a confidence score (0-100%) and reasoning. All decisions are logged and visible in real-time on your dashboard.",
      },
      {
        title: "Strategy-Aware AI",
        content:
          "The AI engine adapts its analysis based on your agent's strategy. Arbitrage agents receive cross-DEX price analysis, Token Snipers get new launch evaluations, Whale Trackers get large wallet activity signals, and Portfolio Rebalancers get allocation recommendations. Each strategy type produces tailored, context-aware decisions.",
      },
      {
        title: "Risk Controls",
        content:
          "All AI decisions are bounded by your configured stop-loss and take-profit limits. If an agent hits its stop-loss threshold, it automatically stops regardless of the AI's recommendation. Auto-restart can be enabled to resume agents after a cooldown. You maintain full control at all times — pause, stop, or adjust any agent instantly.",
      },
    ],
  },
  {
    title: "Tokenomics",
    items: [
      {
        title: "$LOOSE Token",
        content:
          "Total supply: 1,000,000,000 $LOOSE. Token distribution and detailed tokenomics will be announced before launch. Zero buy/sell tax.",
      },
      {
        title: "Utility",
        content:
          "$LOOSE is required to deploy agents (staked as collateral), access premium strategies, participate in governance, and earn rewards from the marketplace. Staking $LOOSE boosts agent performance multipliers.",
      },
      {
        title: "Staking & Rewards",
        content:
          "Multiple staking pools will be available with different lock periods and reward rates. Details on APY and staking tiers will be announced closer to launch.",
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">
              <span className="lime-gradient">Documentation</span>
            </h1>
            <p className="text-muted max-w-lg mx-auto">
              Everything you need to know about Loose, AI agents, and
              building on Robinhood Chain.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20 p-4 rounded-2xl bg-card-bg border border-card-border">
              <h3 className="text-sm font-semibold text-lime mb-3">
                Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-sm text-muted hover:text-lime py-1.5 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <div className="border-t border-card-border mt-4 pt-4">
                <Link
                  href="/dashboard"
                  className="block text-sm text-lime font-medium hover:text-lime-light transition-colors"
                >
                  Launch App &rarr;
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            {sections.map((section) => (
              <ScrollReveal
                key={section.title}
              >
                <div
                  id={section.title.toLowerCase().replace(/\s+/g, "-")}
                >
                  <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-card-border">
                    {section.title}
                  </h2>
                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <div
                        key={item.title}
                        className="p-5 rounded-2xl bg-card-bg border border-card-border"
                      >
                        <h3 className="text-lg font-semibold mb-2 text-lime">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal variant="scale"><div className="p-6 rounded-2xl bg-gradient-to-r from-lime/10 to-transparent border border-lime/20">
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-muted mb-4">
                Follow us for support, discussions, and the latest updates.
              </p>
              <a
                href="https://x.com/trylooseagent"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime text-sm !py-2 inline-block"
              >
                Follow on Twitter / X
              </a>
            </div></ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
