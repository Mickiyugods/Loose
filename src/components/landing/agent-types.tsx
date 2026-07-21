const types = [
  {
    title: "Trading Bots",
    desc: "Snipe launches, ride trends, run grid strategies — all automated across Robinhood Chain DEXs.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "DeFi Agents",
    desc: "Rebalance portfolios, manage LP positions, and optimize allocations across Robinhood Chain protocols.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Analytics Agents",
    desc: "Track whale wallets, scan sentiment, and spot MEV opportunities before anyone else.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 14l4-4 3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Multi-Agent Swarms",
    desc: "Coordinate agents into swarms — trackers feed traders, risk managers guard positions.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 6h7M8.5 18h7M6 8.5v7M18 8.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function AgentTypes() {
  return (
    <section className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 mb-6">
          <span className="text-lime font-mono text-xs font-semibold">02</span>
          <span className="text-muted text-xs">Agent Types</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-2xl">
          One platform.<br />
          <span className="lime-gradient">Infinite strategies.</span>
        </h2>
        <p className="text-muted text-base sm:text-lg mb-16 max-w-lg">
          From simple snipers to complex multi-agent swarms — if you can think it, you can deploy it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {types.map((t) => (
            <div
              key={t.title}
              className="group p-6 rounded-2xl border border-card-border bg-card-bg/50 hover:border-lime/30 hover:bg-lime/[0.02] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg border border-lime/20 text-lime flex items-center justify-center mb-4 group-hover:border-lime/40 group-hover:bg-lime/10 transition-all">
                {t.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-lime transition-colors">{t.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
