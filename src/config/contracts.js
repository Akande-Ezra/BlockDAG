// Contract addresses - update these after deployment
export const CONTRACTS = {
  PREDICTION_PLATFORM: import.meta.env.VITE_PREDICTION_PLATFORM_ADDRESS || '0x...',
  BDAG_TOKEN: import.meta.env.VITE_BDAG_TOKEN_ADDRESS || '0x...',
};

// Network configurations
export const SUPPORTED_NETWORKS = {
  1: 'mainnet',
  5: 'goerli',
  11155111: 'sepolia',
  137: 'polygon',
  42161: 'arbitrum',
  10: 'optimism',
  8453: 'base',
  31337: 'localhost',
  // BlockDAG network will be added here when available
  // blockdag_chain_id: 'blockdag'
};

// Contract ABIs
export const PREDICTION_PLATFORM_ABI = [
  {
    inputs: [{ name: '_symptomHash', type: 'string' }],
    name: 'requestPredictionWithPayment',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'depositTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserTokenBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'predictionCost',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserPredictions',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_predictionId', type: 'uint256' }],
    name: 'getPrediction',
    outputs: [
      {
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'user', type: 'address' },
          { name: 'symptomHash', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'cost', type: 'uint256' },
          { name: 'fulfilled', type: 'bool' },
          { name: 'resultHash', type: 'string' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'predictionId', type: 'uint256' },
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'symptomHash', type: 'string' },
      { indexed: false, name: 'cost', type: 'uint256' }
    ],
    name: 'PredictionRequested',
    type: 'event'
  }
];

export const BDAG_TOKEN_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  }
];