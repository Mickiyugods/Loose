"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.random() * 15 + 5;
        return Math.min(p + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setHidden(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0B0911] flex flex-col items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative mb-8">
        <img
          src="/icon.png"
          alt="Loose"
          className="w-24 h-24 object-contain animate-pulse-logo"
        />
        <div className="absolute inset-0 bg-lime/20 blur-3xl rounded-full" />
      </div>

      <div className="w-48 h-1 bg-[#1E1B28] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-lime-dark via-lime to-lime-light rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-muted text-xs font-mono mt-3">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
