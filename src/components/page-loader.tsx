"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + Math.random() * 20 + 10;
      });
    }, 100);

    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(finish);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] h-0.5">
      <div
        className="h-full bg-gradient-to-r from-lime-dark via-lime to-lime-light shadow-[0_0_10px_rgba(119,255,51,0.5)] transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
