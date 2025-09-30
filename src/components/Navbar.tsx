"use client";

import React from "react";
import Image from "next/image";
import { WalletButton } from "./WalletButton";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo (left) */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Arch Network Logo"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="text-white text-xl font-semibold">
              Arch Network Wallet
            </span>
          </div>

          {/* Wallet button (right) */}
          <div className="flex items-center">
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
