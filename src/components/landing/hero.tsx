import Link from "next/link";
import { HeroNetwork } from "./hero-network";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0B0911]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0911] via-[#0B0911]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0911] via-transparent to-[#0B0911]/50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime/20 bg-lime/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-lime text-xs font-medium tracking-wide uppercase">
                Live on Robinhood Chain
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
              Your AI Agents,<br />
              <span className="lime-gradient">Always Onchain</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted/80 max-w-lg mb-10 leading-relaxed">
              Launch autonomous agents that trade, rebalance portfolios, and
              never sleep — all verifiable onchain.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard/create" className="btn-primary text-base px-8">
                Start Deploying
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-base px-8">
                Learn More &rarr;
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center relative">
            <div className="absolute -inset-16 opacity-80">
              <HeroNetwork />
            </div>
            <img src="/icon.png" alt="Loose" className="relative z-10 w-[34rem] h-[34rem] object-contain drop-shadow-[0_0_140px_rgba(119,255,51,0.4)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
