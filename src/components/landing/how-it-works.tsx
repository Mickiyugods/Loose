const steps = [
  {
    num: "01",
    title: "Pick a Strategy",
    desc: "Choose from battle-tested templates — sniping, arbitrage, portfolio rebalancing, whale tracking — or create your own.",
  },
  {
    num: "02",
    title: "Set & Deploy",
    desc: "Configure budget, risk limits, and targets. Stake $LOOSE as collateral and launch your agent onchain in one click.",
  },
  {
    num: "03",
    title: "Sit Back & Earn",
    desc: "Your agent runs 24/7. Watch PnL grow, review trade logs, and adjust parameters anytime — all from your dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 mb-6">
          <span className="text-lime font-mono text-xs font-semibold">03</span>
          <span className="text-muted text-xs">How It Works</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-2xl">
          Three steps to<br />
          <span className="lime-gradient">autonomous alpha.</span>
        </h2>
        <p className="text-muted text-base sm:text-lg mb-16 max-w-lg">
          No code. No complexity. Just results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="relative group">
              <div className="text-6xl font-bold text-lime/10 font-mono mb-4 group-hover:text-lime/20 transition-colors">
                {s.num}
              </div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
