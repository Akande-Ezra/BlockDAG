import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACTS, PREDICTION_PLATFORM_ABI, BDAG_TOKEN_ABI } from '../config/contracts';

// Contract addresses from config
const PREDICTION_PLATFORM_ADDRESS = CONTRACTS.PREDICTION_PLATFORM;
const BDAG_TOKEN_ADDRESS = CONTRACTS.BDAG_TOKEN;

// Contract ABIs from config - these are imported from config/contracts.js

export function useSmartContract() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read functions
  const usePredictionCost = () => {
    return useReadContract({
      address: PREDICTION_PLATFORM_ADDRESS,
      abi: PREDICTION_PLATFORM_ABI,
      functionName: 'predictionCost',
    });
  };

  const useUserTokenBalance = (userAddress) => {
    return useReadContract({
      address: PREDICTION_PLATFORM_ADDRESS,
      abi: PREDICTION_PLATFORM_ABI,
      functionName: 'getUserTokenBalance',
      args: [userAddress],
      enabled: !!userAddress,
    });
  };

  const useTokenBalance = (userAddress) => {
    return useReadContract({
      address: BDAG_TOKEN_ADDRESS,
      abi: BDAG_TOKEN_ABI,
      functionName: 'balanceOf',
      args: [userAddress],
      enabled: !!userAddress,
    });
  };

  const useTokenAllowance = (userAddress) => {
    return useReadContract({
      address: BDAG_TOKEN_ADDRESS,
      abi: BDAG_TOKEN_ABI,
      functionName: 'allowance',
      args: [userAddress, PREDICTION_PLATFORM_ADDRESS],
      enabled: !!userAddress,
    });
  };

  const useUserPredictions = (userAddress) => {
    return useReadContract({
      address: PREDICTION_PLATFORM_ADDRESS,
      abi: PREDICTION_PLATFORM_ABI,
      functionName: 'getUserPredictions',
      args: [userAddress],
      enabled: !!userAddress,
    });
  };

  const usePrediction = (predictionId) => {
    return useReadContract({
      address: PREDICTION_PLATFORM_ADDRESS,
      abi: PREDICTION_PLATFORM_ABI,
      functionName: 'getPrediction',
      args: [predictionId],
      enabled: !!predictionId,
    });
  };

  // Write functions
  const approveTokens = async (amount) => {
    return writeContract({
      address: BDAG_TOKEN_ADDRESS,
      abi: BDAG_TOKEN_ABI,
      functionName: 'approve',
      args: [PREDICTION_PLATFORM_ADDRESS, parseEther(amount.toString())],
    });
  };

  const requestPrediction = async (symptomHash) => {
    return writeContract({
      address: PREDICTION_PLATFORM_ADDRESS,
      abi: PREDICTION_PLATFORM_ABI,
      functionName: 'requestPredictionWithPayment',
      args: [symptomHash],
    });
  };

  const depositTokens = async (amount) => {
    return writeContract({
      address: PREDICTION_PLATFORM_ADDRESS,
      abi: PREDICTION_PLATFORM_ABI,
      functionName: 'depositTokens',
      args: [parseEther(amount.toString())],
    });
  };

  return {
    // Read hooks
    usePredictionCost,
    useUserTokenBalance,
    useTokenBalance,
    useTokenAllowance,
    useUserPredictions,
    usePrediction,

    // Write functions
    approveTokens,
    requestPrediction,
    depositTokens,

    // Transaction state
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
}

// Utility functions
export const formatTokenAmount = (amount) => {
  return formatEther(amount || 0n);
};

export const parseTokenAmount = (amount) => {
  return parseEther(amount.toString());
};

// Constants
export const CONTRACT_ADDRESSES = {
  PREDICTION_PLATFORM: PREDICTION_PLATFORM_ADDRESS,
  BDAG_TOKEN: BDAG_TOKEN_ADDRESS,
};