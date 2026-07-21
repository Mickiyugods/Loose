"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "up" | "fade" | "scale";
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, variant = "up", delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base =
    variant === "fade"
      ? "scroll-reveal-fade"
      : variant === "scale"
      ? "scroll-reveal-scale"
      : "scroll-reveal";

  const delayClass = delay > 0 ? `scroll-delay-${delay}` : "";

  return (
    <div ref={ref} className={`${base} ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
