import SafeAppsSDK from "@safe-global/safe-apps-sdk";
import SafeAppProvider from "@safe-global/safe-apps-provider";
import { ethers } from "ethers";

/**
 * Initializes a Safe-compatible ethers provider
 * Returns null if not inside a Safe app environment
 */
export async function initSafeProvider() {
  try {
    const appsSdk = new SafeAppsSDK();
    const safe = await appsSdk.safe.getInfo();

    // If not inside a Safe app
    if (!safe || !safe.safeAddress) {
      console.warn("⚠️ Not running inside a Safe app environment.");
      return null;
    }

    const safeProvider = new SafeAppProvider(safe, appsSdk);
    const ethersProvider = new ethers.BrowserProvider(safeProvider);
    console.log("✅ Safe provider initialized:", safe.safeAddress);
    return ethersProvider;
  } catch (err) {
    console.error("❌ Safe provider initialization failed:", err);
    return null;
  }
}
