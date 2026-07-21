const features = [
  {
    title: "No-Code Builder",
    desc: "Deploy agents in minutes with drag-and-drop templates. Zero Solidity needed.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 14v7m-3.5-3.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sub-Second Execution",
    desc: "Agents trade on Robinhood Chain DEXs with lightning-fast latency.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Built-In Risk Controls",
    desc: "Stop-loss, take-profit, max drawdown, and spending caps on every agent.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Sandboxed Contracts",
    desc: "Isolated smart contracts per agent with kill switches and role-based access.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Agent Marketplace",
    desc: "Browse, fork, and profit from community strategies. Earn $LOOSE by publishing yours.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Onchain Analytics",
    desc: "PnL, win rate, trade history, and logs — all verified and transparent onchain.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Product() {
  return (
    <section className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 mb-6">
          <span className="text-lime font-mono text-xs font-semibold">04</span>
          <span className="text-muted text-xs">Product</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-2xl">
          Everything you need.<br />
          <span className="lime-gradient">Nothing you don&apos;t.</span>
        </h2>
        <p className="text-muted text-base sm:text-lg mb-16 max-w-lg">
          Purpose-built infrastructure for autonomous onchain agents.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl border border-card-border bg-card-bg/50 hover:border-lime/30 hover:bg-lime/[0.02] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg border border-lime/20 text-lime flex items-center justify-center mb-4 group-hover:border-lime/40 group-hover:bg-lime/10 transition-all">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold mb-2 group-hover:text-lime transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
