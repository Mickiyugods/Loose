const points = [
  {
    title: "AI Strategy Engine",
    desc: "Smart agents that learn, adapt, and execute in real-time",
  },
  {
    title: "Always-On Trading",
    desc: "24/7 autonomous execution — no downtime, no missed trades",
  },
  {
    title: "Zero-Code Launch",
    desc: "Deploy agents in minutes without writing a single line",
  },
  {
    title: "Transparent Performance",
    desc: "Every trade, every decision — fully verifiable onchain",
  },
];

export function Problem() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 mb-6">
              <span className="text-lime font-mono text-xs font-semibold">01</span>
              <span className="text-muted text-xs">The Problem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
              You sleep.<br />
              <span className="lime-gradient">Markets don&apos;t.</span>
            </h2>

            <p className="text-muted text-base sm:text-lg leading-relaxed max-w-md">
              Every second you&apos;re offline, alpha is lost — arbitrage windows,
              whale moves, portfolio drift. Loose deploys AI agents that
              execute your strategies onchain, around the clock.
            </p>
          </div>

          <div className="space-y-3">
            {points.map((p) => (
              <div
                key={p.title}
                className="group flex items-start gap-4 p-4 rounded-2xl border border-card-border bg-card-bg/50 hover:border-lime/30 transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-lime shrink-0 mt-1.5" />
                <div>
                  <span className="text-sm font-semibold text-white">{p.title}</span>
                  <p className="text-xs text-muted mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
