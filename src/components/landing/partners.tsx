const partners = [
  { name: "Robinhood Chain", letter: "R" },
  { name: "Uniswap", letter: "U" },
  { name: "Arbitrum", letter: "A" },
  { name: "Morpho", letter: "M" },
  { name: "Chainlink", letter: "C" },
  { name: "OpenAI", letter: "O" },
];

export function Partners() {
  return (
    <section className="py-16 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs text-muted uppercase tracking-[0.2em] mb-10">
          Integrated with leading protocols
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity"
            >
              <div className="w-12 h-12 rounded-xl border border-card-border bg-card-bg/50 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{p.letter}</span>
              </div>
              <span className="text-[10px] text-muted">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
