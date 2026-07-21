const steps = [
  {
    num: "01",
    title: "Deploy",
    desc: "More agents = more onchain execution and fee generation.",
  },
  {
    num: "02",
    title: "Earn",
    desc: "Fees fund treasury, staking rewards, and protocol growth.",
  },
  {
    num: "03",
    title: "Grow",
    desc: "Better rewards attract more builders, traders, and stakers.",
  },
  {
    num: "04",
    title: "Expand",
    desc: "More participants drive TVL, agent quality, and adoption.",
  },
];

export function Flywheel() {
  return (
    <section className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 mb-6">
          <span className="text-lime font-mono text-xs font-semibold">06</span>
          <span className="text-muted text-xs">Flywheel</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-2xl">
          Built to<br />
          <span className="lime-gradient">compound growth.</span>
        </h2>
        <p className="text-muted text-base sm:text-lg mb-16 max-w-lg">
          Every agent deployed strengthens the network. Every trade generates value.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              <div className="group p-6 rounded-2xl border border-card-border bg-card-bg/50 h-full hover:border-lime/30 transition-all duration-300">
                <div className="text-xs text-lime font-mono font-bold mb-3">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-lime transition-colors">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-lime/30">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 3l6 5-6 5" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
