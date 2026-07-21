export function LiveStats() {
  return (
    <section className="py-20 border-t border-card-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lime/[0.03] via-transparent to-lime/[0.03]" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime/20 bg-lime/5 mb-4">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-lime text-xs font-medium">Live Stats</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {["Agents Deployed", "Total Volume", "Active Users", "Trades Executed"].map((label) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-lime font-mono">
                -
              </div>
              <div className="text-xs text-muted mt-3 uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted/50">Stats will be available after platform launch</p>
        </div>
      </div>
    </section>
  );
}
