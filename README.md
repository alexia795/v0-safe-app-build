# 🚀 Safe Wallet Pro

An advanced Safe{Wallet} application for secure multi-signature crypto management with automated deployment.

## 🔑 Overview
Safe Wallet Pro is a **Safe App** that lets you:
- Manage multi-sig wallets across Ethereum and other EVM networks  
- Automate transaction approvals and asset transfers  
- Sync with the Safe{Wallet} ecosystem for reliable, trust-minimized execution  

This repository is continuously deployed to **Vercel**.  
Every push to `main` triggers a fresh build and automatic deployment.

## 🌐 Deployment
Your production build is live at:  
👉 **[Safe Wallet Pro on Vercel](https://vercel.com/alexias-projects-88b5c178/v0-safe-wallet-pro)**

## 🛠️ Build & Development
1. **Clone & Install**
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
   cd <YOUR_REPO>
   npm install
   ```
2. **Environment**
   - Create a `.env.local` file and add your Safe configuration:
     ```env
     NEXT_PUBLIC_SAFE_ADDRESS=0xFDf84a0e7D07bC56f7De56696fc409704cC83a24
     NEXT_PUBLIC_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
     ```
3. **Run locally**
   ```bash
   npm run dev
   ```
   App will be available at [http://localhost:3000](http://localhost:3000)

4. **Deploy**
   - Push changes to `main`.
   - Vercel automatically builds and updates the live site.

## ⚡ Features
- **Multi-Signature Security** – Configurable signer thresholds  
- **Automated Transfers** – Batch or single-asset Safe transactions  
- **Cross-Chain Support** – Ethereum, Arbitrum, Polygon, and more  
- **Real-Time Sync** – Live updates via Safe Transaction Service  

## 📄 License
MIT – feel free to use and adapt.

### Next Steps
- Connect your Safe{Wallet} or WalletConnect compatible wallet
- Approve/execute Safe transactions directly from the live app
