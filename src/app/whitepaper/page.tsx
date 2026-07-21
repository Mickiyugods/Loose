import { ScrollReveal } from "@/components/scroll-reveal";

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">
              <span className="lime-gradient">Litepaper</span>
            </h1>
            <p className="text-muted text-sm">Version 1.0 — July 2026</p>
          </div>
        </ScrollReveal>

        <div className="space-y-10 text-sm text-muted leading-relaxed">
          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Abstract</h2>
            <p>
              Loose is an AI agent launchpad built on Robinhood Chain, an Arbitrum-stack Ethereum L2. The platform enables users to deploy, manage, and monetize autonomous AI agents that execute on-chain strategies — including trading, arbitrage, and portfolio management — without requiring deep technical expertise or infrastructure management.
            </p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Problem Statement</h2>
            <p className="mb-3">
              Decentralized finance has grown exponentially, yet participation in advanced strategies remains limited to technically sophisticated users. Current barriers include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Complex smart contract interactions requiring developer knowledge</li>
              <li>24/7 market monitoring that humans cannot sustain</li>
              <li>Fragmented tooling across chains and protocols</li>
              <li>High infrastructure costs for running autonomous strategies</li>
              <li>Lack of accessible, auditable agent frameworks for non-developers</li>
            </ul>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Solution</h2>
            <p className="mb-3">
              Loose abstracts the complexity of on-chain automation into a user-friendly launchpad. Users select from pre-built agent templates or configure custom strategies, deploy them with a single transaction, and monitor performance through an intuitive dashboard.
            </p>
            <div className="space-y-3 mt-4">
              <div>
                <h3 className="font-medium text-white/80 mb-1">One-Click Deployment</h3>
                <p>Deploy agents without writing code. Configure parameters, set risk limits, fund your agent, and launch — all through the Loose interface.</p>
              </div>
              <div>
                <h3 className="font-medium text-white/80 mb-1">Sandboxed Execution</h3>
                <p>Each agent runs in an isolated, auditable environment with configurable spending limits and automatic stop-loss mechanisms.</p>
              </div>
              <div>
                <h3 className="font-medium text-white/80 mb-1">Strategy Marketplace</h3>
                <p>Community-built strategies available for anyone to deploy. Top-performing strategies earn rewards for their creators.</p>
              </div>
            </div>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Agent Architecture</h2>
            <p className="mb-3">Loose supports multiple agent categories, each designed for specific on-chain objectives:</p>
            <div className="grid gap-3">
              {[
                { name: "Trading Agents", desc: "Execute buy/sell strategies based on technical indicators, sentiment analysis, or custom logic." },
                { name: "Arbitrage Agents", desc: "Identify and exploit price discrepancies across DEXs and lending markets." },
                { name: "Portfolio Agents", desc: "Manage diversified portfolios with automatic rebalancing and risk management." },
              ].map((agent) => (
                <div key={agent.name} className="p-3 rounded-xl bg-card-bg border border-card-border">
                  <span className="font-medium text-white/80">{agent.name}</span>
                  <span className="text-muted/70"> — {agent.desc}</span>
                </div>
              ))}
            </div>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">5. AI Decision Engine</h2>
            <p className="mb-3">
              Each Loose agent is powered by an AI decision engine that analyzes market conditions and executes strategies autonomously. The system operates on a 30-second decision cycle:
            </p>
            <div className="space-y-3 mt-4">
              <div>
                <h3 className="font-medium text-white/80 mb-1">Decision Loop</h3>
                <p>Every 30 seconds, running agents send their current context (strategy type, PnL, trade count, risk level, token pairs) to the AI engine. The engine returns a structured decision: buy, sell, or hold — along with a confidence score (0-100%) and reasoning.</p>
              </div>
              <div>
                <h3 className="font-medium text-white/80 mb-1">Strategy-Aware Prompting</h3>
                <p>The AI engine uses strategy-specific prompting. Arbitrage agents receive cross-DEX price data, snipers receive new token launch data, whale trackers receive large wallet activity, and portfolio agents receive rebalancing signals. Each strategy type produces tailored decisions.</p>
              </div>
              <div>
                <h3 className="font-medium text-white/80 mb-1">Risk Controls</h3>
                <p>All AI decisions are bounded by user-configured stop-loss and take-profit limits. If an agent hits its stop-loss threshold, it automatically stops regardless of the AI&apos;s recommendation. Auto-restart can be configured to resume agents after a cooldown period.</p>
              </div>
              <div>
                <h3 className="font-medium text-white/80 mb-1">Real-Time Logging</h3>
                <p>Every AI decision is logged with its action, confidence score, and reasoning. Users can monitor trade history in real-time through the dashboard, with full transparency into why each decision was made.</p>
              </div>
            </div>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Robinhood Chain</h2>
            <p>
              Loose is built exclusively on Robinhood Chain — an Arbitrum-stack Ethereum L2 that delivers sub-second finality, minimal gas fees, and full EVM compatibility. These properties are critical for AI agents that need to execute strategies rapidly and cost-effectively. The low transaction costs make micro-strategies viable and allow agents to operate continuously without prohibitive overhead.
            </p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">7. $LOOSE Token</h2>
            <p className="mb-3">
              $LOOSE is the native utility token powering the Loose ecosystem. Its primary functions include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white/80">Agent Deployment:</strong> Stake $LOOSE to deploy agents on the platform</li>
              <li><strong className="text-white/80">Governance:</strong> Vote on protocol upgrades, fee structures, and marketplace curation</li>
              <li><strong className="text-white/80">Marketplace Access:</strong> Purchase premium strategies and agent templates</li>
              <li><strong className="text-white/80">Revenue Sharing:</strong> Stakers earn a share of platform fees generated by agent activity</li>
            </ul>
            <p className="mt-3 text-xs text-muted/60">
              Detailed tokenomics including supply, distribution, and vesting schedules will be announced before launch.
            </p>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Security Model</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All smart contracts will undergo third-party audits before mainnet deployment</li>
              <li>Agents execute in sandboxed environments with configurable spending caps</li>
              <li>Non-custodial architecture — users retain full control of their funds at all times</li>
              <li>Automatic stop-loss and kill-switch mechanisms for every deployed agent</li>
              <li>Open-source agent framework for community review and verification</li>
            </ul>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Roadmap</h2>
            <div className="space-y-4">
              {[
                { phase: "Phase 1", title: "Foundation", items: "Platform launch, core agent templates, $LOOSE token deployment" },
                { phase: "Phase 2", title: "Expansion", items: "Strategy marketplace, community-built agents, advanced analytics" },
                { phase: "Phase 3", title: "Ecosystem", items: "Cross-chain agents, governance activation, institutional features" },
              ].map((r) => (
                <div key={r.phase} className="p-4 rounded-xl bg-card-bg border border-card-border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lime font-mono text-xs font-semibold">{r.phase}</span>
                    <span className="font-medium text-white/80">{r.title}</span>
                  </div>
                  <p className="text-muted/70 text-xs">{r.items}</p>
                </div>
              ))}
            </div>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Team & Contact</h2>
            <p>
              Loose is built by a team of DeFi engineers and AI researchers committed to making autonomous on-chain agents accessible to everyone. For inquiries, partnerships, or community involvement, reach out on{" "}
              <a href="https://x.com/trylooseagent" target="_blank" rel="noopener noreferrer" className="text-lime hover:underline">
                Twitter / X (@trylooseagent)
              </a>.
            </p>
          </section></ScrollReveal>
        </div>
      </div>
    </div>
  );
}
