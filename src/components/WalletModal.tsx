"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useWalletContext } from "@/contexts/WalletContext";
import { WalletName } from "@/hooks/useWallet";
import { Network } from "@saturnbtcio/psbt";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORTED_WALLETS: {
  name: WalletName;
  displayName: string;
  logo: string;
  checkDetection: () => boolean;
}[] = [
  {
    name: "unisat",
    displayName: "UniSat",
    logo: "/wallets/unisat.png",
    checkDetection: () => typeof window !== "undefined" && !!window.unisat,
  },
  {
    name: "xverse",
    displayName: "Xverse",
    logo: "/wallets/xverse.png",
    checkDetection: () =>
      typeof window !== "undefined" &&
      !!window.XverseProviders?.BitcoinProvider,
  },
  {
    name: "magic-eden",
    displayName: "Magic Eden",
    logo: "/wallets/magiceden.png",
    checkDetection: () =>
      typeof window !== "undefined" && !!window.magicEden?.bitcoin,
  },
];

const NETWORKS: { value: Network; label: string }[] = [
  { value: "mainnet", label: "Mainnet" },
  { value: "testnet", label: "Testnet" },
];

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connect, status } = useWalletContext();
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("testnet");
  const [error, setError] = useState<string | null>(null);
  const [walletDetections, setWalletDetections] = useState<
    Record<WalletName, boolean>
  >({} as Record<WalletName, boolean>);

  // Check wallet detection status
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const detections: Record<WalletName, boolean> = {} as Record<
        WalletName,
        boolean
      >;
      SUPPORTED_WALLETS.forEach((wallet) => {
        detections[wallet.name] = wallet.checkDetection();
      });
      setWalletDetections(detections);
    }
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleConnect = async (walletName: WalletName) => {
    try {
      setError(null);
      await connect(walletName, selectedNetwork);
      onClose(); // Close modal on successful connection
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#10141F] rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-center p-6 relative">
          <h2 className="text-2xl font-semibold text-white text-center">
            Connect a wallet
          </h2>
          <h2 className="text-2xl font-semibold text-white text-center">
            on Arch to continue
          </h2>
          <button
            onClick={onClose}
            className="absolute right-6 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          {/* Wallet Options */}
          <div className="space-y-2 mb-6">
            {SUPPORTED_WALLETS.map((wallet) => {
              const isDetected = walletDetections[wallet.name];
              return (
                <button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet.name)}
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={wallet.logo}
                      alt={wallet.displayName}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <span className="font-medium text-white">
                      {wallet.displayName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm ${
                        isDetected ? "text-green-400" : "text-gray-400"
                      }`}
                    >
                      {isDetected ? "Detected" : "Not detected"}
                    </span>
                    {status === "loading" && (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Network Selection at bottom */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Network:
            </label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value as Network)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={status === "loading"}
            >
              {NETWORKS.map((network) => (
                <option
                  key={network.value}
                  value={network.value}
                  className="bg-gray-700"
                >
                  {network.label}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-900 border border-red-600 text-red-300 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
