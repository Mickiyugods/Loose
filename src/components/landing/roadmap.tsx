const phases = [
  {
    phase: "Q3 2026",
    title: "Foundation",
    status: "active",
    items: [
      "Protocol launch on Robinhood Chain",
      "$LOOSE token deployment",
      "No-code agent builder v1",
      "Initial strategy templates",
    ],
  },
  {
    phase: "Q4 2026",
    title: "Expansion",
    status: "upcoming",
    items: [
      "Agent marketplace launch",
      "Multi-agent swarm support",
      "Advanced analytics dashboard",
      "Mobile app beta",
    ],
  },
  {
    phase: "Q1 2027",
    title: "Intelligence",
    status: "upcoming",
    items: [
      "AI-powered strategy builder",
      "Cross-chain deployment",
      "Copy trading from leaderboard",
      "Institutional API access",
    ],
  },
  {
    phase: "Q2 2027",
    title: "Ecosystem",
    status: "upcoming",
    items: [
      "DAO governance launch",
      "Agent SDK for developers",
      "Partner integrations",
      "Agent-to-agent protocol",
    ],
  },
];

export function Roadmap() {
  return (
    <section className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 mb-6">
          <span className="text-lime font-mono text-xs font-semibold">07</span>
          <span className="text-muted text-xs">Roadmap</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-2xl">
          The road to<br />
          <span className="lime-gradient">full autonomy.</span>
        </h2>
        <p className="text-muted text-base sm:text-lg mb-16 max-w-lg">
          Shipping fast. Building in public. Here&apos;s what&apos;s coming.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map((p) => (
            <div
              key={p.phase}
              className={`group p-6 rounded-2xl border h-full transition-all duration-300 ${
                p.status === "active"
                  ? "border-lime/30 bg-lime/5 hover:border-lime/50"
                  : "border-card-border bg-card-bg/50 hover:border-lime/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs font-mono font-bold ${
                    p.status === "active" ? "text-lime" : "text-muted"
                  }`}
                >
                  {p.phase}
                </span>
                {p.status === "active" && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-lime/10 text-lime font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold mb-4">{p.title}</h3>
              <ul className="space-y-2.5">
                {p.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        p.status === "active" ? "bg-lime" : "bg-muted/30"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
