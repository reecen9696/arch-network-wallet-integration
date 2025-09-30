"use client";

import React from "react";
import { WalletButton } from "./WalletButton";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16">
          {/* Wallet button (right) */}
          <div className="flex items-center">
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
