import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import SafeAppsSDK from "@safe-global/safe-apps-sdk";
import SafeAppsProvider from "@safe-global/safe-apps-provider";
import { ethers } from "ethers";

function SafeWalletApp({ Component, pageProps }: AppProps) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const appsSdk = new SafeAppsSDK();
        const safeInfo = await appsSdk.safe.getInfo();

        const safeProvider = new SafeAppsProvider(appsSdk);
        const ethersProvider = new ethers.BrowserProvider(safeProvider as any);

        setProvider(ethersProvider);
        console.log("Connected Safe:", safeInfo);
      } catch (error) {
        console.warn("Not inside Safe context, fallback to WalletConnect");
      }
    };

    init();
  }, []);

  return <Component {...pageProps} provider={provider} />;
}

export default SafeWalletApp;
