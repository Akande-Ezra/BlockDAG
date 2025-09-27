import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'BlockDAG Health Prediction Platform',
  projectId: '2bd7a4c3394b9fbfac7b6bb3d70f90eb', // Public demo project ID for testing
  chains: [sepolia, mainnet, polygon, optimism, arbitrum, base], // Removed custom chain for now
  ssr: false, // If your dApp uses server side rendering (SSR)
});