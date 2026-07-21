"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ConnectButton } from "./connect-button";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
];

const mobileLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/token", label: "$LOOSE" },
  { href: "/docs", label: "Documentation" },
  { href: "/whitepaper", label: "Litepaper" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const [clicked, setClicked] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleClick = (href: string) => {
    setClicked(href);
    setTimeout(() => setClicked(null), 400);
  };

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="flex items-center gap-1 bg-[#111019] border border-[#2a2735] rounded-full px-2 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <Link href="/" className="shrink-0 transition-transform duration-200 active:scale-90">
            <img src="/icon.png" alt="Loose" className="w-14 h-14 object-contain" />
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {links.map((l) => {
              const isActive = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href.replace("/#", "/")));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => handleClick(l.href)}
                  className={`relative text-sm px-3.5 py-2 whitespace-nowrap shrink-0 rounded-full transition-all duration-200 active:scale-90 ${
                    isActive
                      ? "text-black bg-lime font-semibold"
                      : "text-muted hover:text-white hover:bg-white/5"
                  } ${clicked === l.href ? "animate-nav-click" : ""}`}
                >
                  {l.label}
                </Link>
              );
            })}

            <Link
              href="/token"
              onClick={() => handleClick("/token")}
              className={`btn-lime text-sm !py-2 !px-5 shrink-0 transition-all duration-200 active:scale-90 ${clicked === "/token" ? "animate-nav-click" : ""}`}
            >
              $LOOSE
            </Link>
          </div>

          <div className="hidden sm:block ml-1 shrink-0">
            <ConnectButton />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full text-muted hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md sm:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute top-24 left-4 right-4 bg-[#111019] border border-[#2a2735] rounded-2xl p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1 mb-4">
              {mobileLinks.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-lime/10 text-lime"
                        : "text-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-card-border pt-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
