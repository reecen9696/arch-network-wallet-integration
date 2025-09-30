"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useWallet, WalletName } from "@/hooks/useWallet";
import { Network } from "@saturnbtcio/psbt";

interface WalletContextType {
  wallet: ReturnType<typeof useWallet>["wallet"];
  connected: boolean;
  status: "idle" | "loading";
  connect: (
    walletName: WalletName,
    network: Network
  ) => Promise<ReturnType<typeof useWallet>["wallet"]>;
  disconnect: () => void;
  runeAddress: string | null;
  paymentAddress: string | null;
  addresses: string[];
  signPsbt: ReturnType<typeof useWallet>["signPsbt"];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const walletHook = useWallet();

  return (
    <WalletContext.Provider value={walletHook}>
      {children}
    </WalletContext.Provider>
  );
};
