"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    async function setupProvider() {
      if (typeof window !== "undefined" && window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        console.log("✅ Ethers provider initialized");
      } else {
        console.warn("⚠️ No wallet provider found. Are you in a Safe or browser wallet?");
      }
    }

    setupProvider();
  }, []);

  return (
    <div>
      {provider ? (
        <p>✅ Connected to provider</p>
      ) : (
        <p>🔌 Waiting for wallet connection...</p>
      )}
    </div>
  );
}
