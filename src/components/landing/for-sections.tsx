import Link from "next/link";

export function ForSections() {
  return (
    <section className="py-24 sm:py-32 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="group p-8 sm:p-10 rounded-2xl border border-card-border bg-card-bg/50 hover:border-lime/20 transition-all duration-300">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime/20 bg-lime/5 mb-6">
              <span className="text-lime text-xs font-medium">For Builders</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Deploy strategies,<br />
              <span className="lime-gradient">not infrastructure.</span>
            </h3>

            <ul className="space-y-3 mb-8">
              {[
                "No-code agent builder with templates",
                "Publish to marketplace & earn fees",
                "Multi-agent swarm coordination",
                "Full onchain transparency",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/dashboard/create" className="btn-primary text-sm">
              Start Building &rarr;
            </Link>
          </div>

          <div className="group p-8 sm:p-10 rounded-2xl border border-card-border bg-card-bg/50 hover:border-lime/20 transition-all duration-300">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg mb-6">
              <span className="text-white text-xs font-medium">For Traders</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Let AI trade<br />
              <span className="lime-gradient">while you sleep.</span>
            </h3>

            <ul className="space-y-3 mb-8">
              {[
                "Browse top-performing agents",
                "Fork proven strategies in one click",
                "Built-in risk controls & limits",
                "Zero coding required",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/leaderboard" className="btn-secondary text-sm">
              Explore Agents &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
