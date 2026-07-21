import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <img src="/icon.png" alt="Loose" className="w-8 h-8 object-contain" />
              <span className="font-bold text-lg">Loose</span>
            </Link>
            <p className="text-xs text-muted/60 leading-relaxed">
              AI Agent Launchpad on Robinhood Chain. Deploy, manage, and monetize autonomous agents.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard" className="text-sm text-muted hover:text-lime transition-colors">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-sm text-muted hover:text-lime transition-colors">
                Leaderboard
              </Link>
              <Link href="/token" className="text-sm text-muted hover:text-lime transition-colors">
                $LOOSE
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <div className="flex flex-col gap-2">
              <Link href="/docs" className="text-sm text-muted hover:text-lime transition-colors">
                Documentation
              </Link>
              <Link href="/whitepaper" className="text-sm text-muted hover:text-lime transition-colors">
                Litepaper
              </Link>
              <Link href="/faq" className="text-sm text-muted hover:text-lime transition-colors">
                FAQ
              </Link>
              <Link href="/privacy" className="text-sm text-muted hover:text-lime transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted hover:text-lime transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Social</h4>
            <div className="flex flex-col gap-2">
              <a href="https://x.com/trylooseagent" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-lime transition-colors">
                Twitter / X
              </a>
              <a href="https://github.com/Mickiyugods/Loose" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-lime transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted/50">
            &copy; 2026 Loose. All rights reserved.
          </p>
          <p className="text-xs text-muted/50">
            Deploy AI agents. Stay loose.
          </p>
        </div>
      </div>
    </footer>
  );
}
