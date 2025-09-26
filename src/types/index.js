// User interface
export const createUser = (address = '', isAuthenticated = false, tokens = 0, signupReward = false) => ({
  address,
  isAuthenticated,
  tokens,
  signupReward
});

// Health Prediction interface
export const createHealthPrediction = (id, symptoms, prediction, timestamp, cost) => ({
  id,
  symptoms,
  prediction,
  timestamp,
  cost
});

// Wallet State interface
export const createWalletState = (isConnected = false, address = null, balance = 0) => ({
  isConnected,
  address,
  balance
});