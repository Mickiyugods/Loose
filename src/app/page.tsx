import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";
import { Problem } from "@/components/landing/problem";
import { AgentTypes } from "@/components/landing/agent-types";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Product } from "@/components/landing/product";
import { Compare } from "@/components/landing/compare";
import { ForSections } from "@/components/landing/for-sections";
import { LiveStats } from "@/components/landing/live-stats";
import { Flywheel } from "@/components/landing/flywheel";
import { CTA } from "@/components/landing/cta";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollReveal>
        <StatsBar />
      </ScrollReveal>
      <ScrollReveal>
        <Problem />
      </ScrollReveal>
      <ScrollReveal>
        <AgentTypes />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <Product />
      </ScrollReveal>
      <ScrollReveal>
        <Compare />
      </ScrollReveal>
      <ScrollReveal>
        <ForSections />
      </ScrollReveal>
      <ScrollReveal>
        <LiveStats />
      </ScrollReveal>
      <ScrollReveal variant="scale">
        <Flywheel />
      </ScrollReveal>
      <ScrollReveal variant="fade">
        <CTA />
      </ScrollReveal>
    </>
  );
}
