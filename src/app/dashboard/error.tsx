"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen pt-28 pb-12 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <svg width="32" height="32" fill="none" stroke="#f87171" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 9v4m0 4h.01M12 3l9.5 16.5H2.5L12 3z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">Dashboard Error</h1>
        <p className="text-muted text-sm mb-8 leading-relaxed">
          Failed to load the dashboard. Please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-lime text-sm">
            Try Again
          </button>
          <Link href="/" className="btn-outline text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
