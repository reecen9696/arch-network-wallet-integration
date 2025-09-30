"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useWalletContext } from "@/contexts/WalletContext";
import { WalletModal } from "./WalletModal";

export const WalletButton: React.FC = () => {
  const { connected, disconnect, wallet, paymentAddress } = useWalletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeWallet = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getWalletDisplayName = (walletName: string) => {
    switch (walletName) {
      case "unisat":
        return "UniSat";
      case "xverse":
        return "Xverse";
      case "magic-eden":
        return "Magic Eden";
      default:
        return walletName;
    }
  };

  const getWalletLogo = (walletName: string) => {
    switch (walletName) {
      case "unisat":
        return "/wallets/unisat.png";
      case "xverse":
        return "/wallets/xverse.png";
      case "magic-eden":
        return "/wallets/magiceden.png";
      default:
        return "/wallets/unisat.png"; // fallback
    }
  };

  if (!connected) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4E3AF1] hover:bg-[#4530D1] text-white font-medium py-3 px-6 rounded transition-colors"
        >
          Select Wallet
        </button>
        <WalletModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onMouseEnter={() => setIsDropdownOpen(true)}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 bg-[#4E3AF1] hover:bg-[#4530D1] text-white font-medium py-3 px-6 rounded transition-colors"
      >
        <Image
          src={getWalletLogo(wallet?.walletName || "")}
          alt={getWalletDisplayName(wallet?.walletName || "")}
          width={20}
          height={20}
          className="rounded"
          unoptimized
        />
        <span>{formatAddress(paymentAddress || "")}</span>
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-full bg-[#10141F] rounded-md shadow-xl z-50"
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="p-2">
            {/* Actions */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paymentAddress || "");
                  // Could add a toast notification here
                }}
                className="w-full text-center px-3 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-colors"
              >
                Copy Address
              </button>
              <button
                onClick={handleChangeWallet}
                className="w-full text-center px-3 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-colors"
              >
                Change Wallet
              </button>
              <button
                onClick={handleDisconnect}
                className="w-full text-center px-3 py-2 text-sm text-red-400 hover:bg-red-900 rounded-md transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
