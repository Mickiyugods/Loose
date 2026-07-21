"use client";

import { useState } from "react";
import { useWallet } from "./wallet-provider";

export function ConnectButton() {
  const { isConnected, isConnecting, connect, disconnect, shortAddress } =
    useWallet();
  const [showMenu, setShowMenu] = useState(false);

  if (isConnecting) {
    return (
      <button className="btn-lime text-sm !py-2 !px-5 opacity-70 cursor-wait">
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M4 12a8 8 0 018-8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        Connecting...
      </button>
    );
  }

  if (isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card-bg border border-lime/30 text-sm font-medium hover:border-lime/50 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          {shortAddress}
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 4l4 4 4-4" />
          </svg>
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card-bg border border-card-border shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-card-border">
                <div className="text-[10px] text-muted">Connected to</div>
                <div className="text-xs font-medium text-lime">
                  Robinhood Chain
                </div>
              </div>
              <button
                onClick={() => {
                  disconnect();
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button onClick={connect} className="btn-lime text-sm !py-2 !px-5">
      Connect Wallet
    </button>
  );
}
