export function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="section-number">/</span>
          <span className="section-label">06</span>
        </div>
        <p className="section-label mb-4">Tokenomics</p>
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-16 max-w-2xl">
          $ARC powers every agent on the network
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-card-border bg-card-bg/50 text-center">
            <div className="text-3xl font-bold text-lime font-mono mb-1">
              1B
            </div>
            <div className="text-xs text-muted uppercase tracking-wider">
              Total Supply
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-card-border bg-card-bg/50 text-center">
            <div className="text-3xl font-bold text-lime font-mono mb-1">
              0%
            </div>
            <div className="text-xs text-muted uppercase tracking-wider">
              Buy / Sell Tax
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-card-border bg-card-bg/50 text-center">
            <div className="text-3xl font-bold text-lime font-mono mb-1">
              Burned
            </div>
            <div className="text-xs text-muted uppercase tracking-wider">
              LP Status
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-6">Distribution</h3>
            <div className="space-y-4">
              {[
                { label: "Community & Rewards", pct: 35 },
                { label: "Liquidity Pool (Burned)", pct: 25 },
                { label: "Development", pct: 15 },
                { label: "Team (12mo Vest)", pct: 10 },
                { label: "Marketing", pct: 10 },
                { label: "Reserve", pct: 5 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted">{item.label}</span>
                    <span className="font-semibold text-lime font-mono">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-card-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-lime rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Utility</h3>
            <div className="space-y-4">
              {[
                {
                  title: "Agent Deployment",
                  desc: "$ARC is staked as collateral when deploying agents. Withdraw anytime by stopping the agent.",
                },
                {
                  title: "Staking Rewards",
                  desc: "Stake $ARC to earn 42-120% APY across multiple pools. Higher stakes boost agent performance.",
                },
                {
                  title: "Marketplace Fees",
                  desc: "Earn $ARC when other users fork or use your published agents.",
                },
                {
                  title: "Governance",
                  desc: "$ARC holders vote on protocol upgrades, fee structures, and treasury allocation.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl border border-card-border bg-card-bg/50"
                >
                  <h4 className="text-sm font-semibold text-lime mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
