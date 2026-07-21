import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 sm:py-32 border-t border-card-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime/[0.03] to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
          Ready to go<br />
          <span className="lime-gradient">autonomous?</span>
        </h2>
        <p className="text-muted text-lg max-w-md mx-auto mb-10">
          Deploy your first AI agent on Robinhood Chain in under 5 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard/create" className="btn-primary text-base px-8">
            Start Deploying
          </Link>
          <Link href="/leaderboard" className="btn-secondary text-base px-8">
            Explore Agents &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
