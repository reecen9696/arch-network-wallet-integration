import { useState, useCallback } from "react";
import { Network } from "@saturnbtcio/psbt";

// Types based on the Bitcoin wallet adapter structure
export type WalletName = "unisat" | "xverse" | "magic-eden";

export interface Address {
  address: string;
  publicKey: string;
  purpose: string;
  addressType: string;
  walletType: string;
}

export interface BitcoinWallet {
  walletName: WalletName;
  network: Network;
  runeAddress: Address;
  paymentAddress?: Address;
  addresses: Address[];
  signPsbt(unsignedPsbt: UnsignedPsbt, broadcast: boolean): Promise<string>;
  signMessage(msg: string, type?: "ecdsa" | "bip322-simple"): Promise<string>;
}

export interface UnsignedPsbt {
  psbt64: string;
  inputsToSign: Array<{
    address: string;
    signingIndexes: number[];
    sigHash?: number;
  }>;
}

export class WalletException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WalletException";
  }
}

// Declare global interfaces for wallet providers
declare global {
  interface Window {
    unisat?: {
      requestAccounts(): Promise<string[]>;
      getPublicKey(): Promise<string>;
      getChain(): Promise<{ enum: string }>;
      switchChain(chain: string): Promise<void>;
      signPsbt(psbt: string, options?: any): Promise<string>;
      signMessage(msg: string, type?: string): Promise<string>;
    };
    XverseProviders?: {
      BitcoinProvider?: any;
    };
    magicEden?: {
      bitcoin?: any;
    };
  }
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<BitcoinWallet | null>(null);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [connected, setConnected] = useState(false);

  const connect = useCallback(
    async (walletName: WalletName, network: Network) => {
      setStatus("loading");
      try {
        let walletInstance: BitcoinWallet;

        switch (walletName) {
          case "unisat":
            walletInstance = await connectUnisat(network);
            break;
          case "xverse":
            walletInstance = await connectXverse(network);
            break;
          case "magic-eden":
            walletInstance = await connectMagicEden(network);
            break;
          default:
            throw new Error("Unsupported wallet");
        }

        setWallet(walletInstance);
        setConnected(true);
        return walletInstance;
      } catch (error) {
        if (error instanceof WalletException) {
          console.error("Wallet error:", error.message);
        } else {
          console.error("Wallet error:", error);
        }
        throw error;
      } finally {
        setStatus("idle");
      }
    },
    []
  );

  const signPsbt = useCallback(
    async (
      unsignedPsbt: UnsignedPsbt,
      broadcast: boolean,
      handlers?: {
        onSuccess?: () => void;
        onError?: (error: WalletException | Error) => void;
      }
    ) => {
      if (!wallet) {
        throw new WalletException("wallet_not_connected");
      }

      setStatus("loading");
      try {
        const signedPsbt = await wallet.signPsbt(unsignedPsbt, broadcast);
        handlers?.onSuccess?.();
        return signedPsbt;
      } catch (error) {
        handlers?.onError?.(error as WalletException | Error);
        throw error;
      } finally {
        setStatus("idle");
      }
    },
    [wallet]
  );

  const disconnect = useCallback(() => {
    setWallet(null);
    setConnected(false);
  }, []);

  return {
    wallet,
    connected,
    status,
    connect,
    signPsbt,
    disconnect,
    runeAddress: wallet?.runeAddress?.address || null,
    paymentAddress: wallet?.paymentAddress?.address || null,
    addresses: wallet?.addresses?.map((addr: Address) => addr.address) || [],
  };
};

// Wallet connection functions
async function connectUnisat(network: Network): Promise<BitcoinWallet> {
  if (!window.unisat) {
    throw new WalletException("wallet_not_installed");
  }

  try {
    const accounts = await window.unisat.requestAccounts();
    if (!accounts || accounts.length === 0) {
      throw new WalletException("user_cancelled");
    }

    const publicKey = await window.unisat.getPublicKey();

    const addresses: Address[] = accounts.map((address, index) => ({
      address,
      publicKey,
      purpose: index === 0 ? "ordinals" : "payment",
      addressType: "p2tr", // UniSat typically uses Taproot
      walletType: "software",
    }));

    return {
      walletName: "unisat",
      network,
      runeAddress: addresses[0]!,
      paymentAddress: addresses[1] || addresses[0],
      addresses,
      async signPsbt(
        unsignedPsbt: UnsignedPsbt,
        broadcast: boolean
      ): Promise<string> {
        if (!window.unisat) {
          throw new WalletException("wallet_not_installed");
        }
        // Implementation would go here
        return await window.unisat.signPsbt(unsignedPsbt.psbt64);
      },
      async signMessage(
        msg: string,
        type?: "ecdsa" | "bip322-simple"
      ): Promise<string> {
        if (!window.unisat) {
          throw new WalletException("wallet_not_installed");
        }
        return await window.unisat.signMessage(msg, type);
      },
    };
  } catch (error) {
    throw new WalletException("user_cancelled");
  }
}

async function connectXverse(network: Network): Promise<BitcoinWallet> {
  if (!window.XverseProviders?.BitcoinProvider) {
    throw new WalletException("wallet_not_installed");
  }

  // Mock implementation for Xverse
  const mockAddress: Address = {
    address: `xverse_${network}_address`,
    publicKey: "xverse_public_key",
    purpose: "ordinals",
    addressType: "p2tr",
    walletType: "software",
  };

  return {
    walletName: "xverse",
    network,
    runeAddress: mockAddress,
    paymentAddress: mockAddress,
    addresses: [mockAddress],
    async signPsbt(): Promise<string> {
      throw new WalletException("wallet_not_connected");
    },
    async signMessage(): Promise<string> {
      throw new WalletException("wallet_not_connected");
    },
  };
}

async function connectMagicEden(network: Network): Promise<BitcoinWallet> {
  if (!window.magicEden?.bitcoin) {
    throw new WalletException("wallet_not_installed");
  }

  // Mock implementation for Magic Eden
  const mockAddress: Address = {
    address: `magic_eden_${network}_address`,
    publicKey: "magic_eden_public_key",
    purpose: "ordinals",
    addressType: "p2tr",
    walletType: "software",
  };

  return {
    walletName: "magic-eden",
    network,
    runeAddress: mockAddress,
    paymentAddress: mockAddress,
    addresses: [mockAddress],
    async signPsbt(): Promise<string> {
      throw new WalletException("wallet_not_connected");
    },
    async signMessage(): Promise<string> {
      throw new WalletException("wallet_not_connected");
    },
  };
}
