const rows = [
  { cap: "24/7 Autonomous Execution", loose: "full", manual: "none", bots: "partial" },
  { cap: "AI-Powered Strategy", loose: "full", manual: "none", bots: "partial" },
  { cap: "No-Code Deployment", loose: "full", manual: "none", bots: "none" },
  { cap: "Onchain Verification", loose: "full", manual: "partial", bots: "none" },
  { cap: "Smart Risk Management", loose: "full", manual: "partial", bots: "partial" },
  { cap: "Multi-Agent Coordination", loose: "full", manual: "none", bots: "none" },
  { cap: "Strategy Marketplace", loose: "full", manual: "none", bots: "partial" },
  { cap: "Real-Time Analytics", loose: "full", manual: "partial", bots: "partial" },
];

function Dot({ type }: { type: string }) {
  return <span className={type === "full" ? "dot-full" : type === "partial" ? "dot-partial" : "dot-none"} />;
}

export function Compare() {
  return (
    <section className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 mb-6">
          <span className="text-lime font-mono text-xs font-semibold">05</span>
          <span className="text-muted text-xs">Compare</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-2xl">
          Why settle for<br />
          <span className="lime-gradient">less than Loose?</span>
        </h2>
        <p className="text-muted text-base sm:text-lg mb-16 max-w-lg">
          Manual trading misses alpha. Basic bots lack brains. Loose gives you both.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-card-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-card-bg/80">
                <th className="text-left py-4 px-6 text-xs text-muted font-medium uppercase tracking-wider">
                  Capability
                </th>
                <th className="text-center py-4 px-4 text-xs font-semibold text-lime uppercase tracking-wider">
                  Loose
                </th>
                <th className="text-center py-4 px-4 text-xs text-muted font-medium uppercase tracking-wider">
                  Manual
                </th>
                <th className="text-center py-4 px-4 text-xs text-muted font-medium uppercase tracking-wider">
                  Basic Bots
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.cap} className="border-t border-card-border/50 hover:bg-lime/[0.02] transition-colors">
                  <td className="py-4 px-6 font-medium">{r.cap}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex justify-center"><Dot type={r.loose} /></span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex justify-center"><Dot type={r.manual} /></span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex justify-center"><Dot type={r.bots} /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-6 mt-6 text-xs text-muted">
          <span className="flex items-center gap-2"><span className="dot-full" /> Full</span>
          <span className="flex items-center gap-2"><span className="dot-partial" /> Partial</span>
          <span className="flex items-center gap-2"><span className="dot-none" /> None</span>
        </div>
      </div>
    </section>
  );
}
