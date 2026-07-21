"use client";

import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

const robinhoodChain = {
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.testnet.chain.robinhood.com"] },
  },
  blockExplorers: {
    default: { name: "Robinhood Explorer", url: "https://explorer.testnet.chain.robinhood.com" },
  },
};

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  disconnect: () => void;
  shortAddress: string;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  connect: () => {},
  disconnect: () => {},
  shortAddress: "",
});

export function useWallet() {
  return useContext(WalletContext);
}

function WalletBridge({ children }: { children: ReactNode }) {
  const { login, logout, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();

  const wallet = wallets[0];
  const address = wallet?.address ?? null;
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: authenticated && !!address,
        isConnecting: !ready,
        connect: login,
        disconnect: logout,
        shortAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#77FF33",
          showWalletLoginFirst: true,
        },
        loginMethods: ["wallet"],
        defaultChain: robinhoodChain,
        supportedChains: [robinhoodChain],
      }}
    >
      <WalletBridge>{children}</WalletBridge>
    </PrivyProvider>
  );
}
