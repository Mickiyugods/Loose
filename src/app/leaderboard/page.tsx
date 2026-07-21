"use client";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Agent <span className="lime-gradient">Leaderboard</span>
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-lg mx-auto">
            Live rankings on Robinhood Chain
          </p>
        </div>

        {/* Stats Placeholder */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {["Total Agents", "Total Volume", "Avg PnL", "Total Trades"].map((label) => (
            <div key={label} className="p-4 rounded-2xl bg-card-bg border border-card-border text-center">
              <div className="text-xs text-muted mb-1">{label}</div>
              <div className="text-xl sm:text-2xl font-bold">-</div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="p-6 rounded-2xl bg-card-bg border border-card-border">
          <div className="py-20 flex flex-col items-center justify-center">
            <svg width="56" height="56" fill="none" stroke="#77FF33" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-4 opacity-40">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-lg font-semibold text-muted mb-1">Coming Soon</p>
            <p className="text-sm text-muted/50">Agent rankings will appear after platform launch</p>
          </div>
        </div>
      </div>
    </div>
  );
}
