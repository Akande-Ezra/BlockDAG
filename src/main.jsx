import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createConfig,
  WagmiConfig,
} from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
} from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';
import { http } from "viem";


const { chains, publicClient } = configureChains(
  [sepolia, mainnet, polygon, optimism, arbitrum],
  [http()]
);

const { connectors } = getDefaultWallets({
  appName: 'Healthcare Prediction DAO',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // from walletconnect.com (free)
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </BrowserRouter>
  </StrictMode>,
)
