const stats = [
  { value: "0%", label: "Platform Fee" },
  { value: "$0", label: "Gas to Deploy" },
  { value: "24/7", label: "Agent Uptime" },
];

export function StatsBar() {
  return (
    <section className="border-y border-card-border bg-card-bg/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 divide-x divide-card-border">
          {stats.map((s) => (
            <div key={s.label} className="py-8 px-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-lime font-mono">
                {s.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
