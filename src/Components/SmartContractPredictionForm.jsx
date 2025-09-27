import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Brain, Wallet, AlertCircle, Loader2 } from 'lucide-react';
import { useSmartContract, formatTokenAmount } from '../hooks/useSmartContract';
import { ConnectWallet } from './ui/connectWallet';

export default function SmartContractPredictionForm({ onPredictionStart, onPredictionComplete }) {
  const { address, isConnected } = useAccount();
  const {
    usePredictionCost,
    useUserTokenBalance,
    useTokenBalance,
    useTokenAllowance,
    approveTokens,
    requestPrediction,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  } = useSmartContract();

  const [symptoms, setSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState('form'); // 'form', 'approval', 'transaction', 'complete'
  const [mockBalance, setMockBalance] = useState('50'); // Track mock balance for development

  // Contract data - with fallbacks for development
  const { data: predictionCost } = usePredictionCost();
  const { data: tokenBalance } = useTokenBalance(address);
  const { data: tokenAllowance } = useTokenAllowance(address);

  // Use mock data when contracts aren't deployed yet
  const mockPredictionCost = '0.1'; // 0.1 BDAG
  const mockTokenBalance = '50'; // 50 BDAG (user's balance)
  const mockTokenAllowance = '0'; // No allowance initially

  const predictionCostFormatted = predictionCost ? formatTokenAmount(predictionCost) : mockPredictionCost;
  const walletBalanceFormatted = tokenBalance ? formatTokenAmount(tokenBalance) : mockBalance;
  const allowanceFormatted = tokenAllowance ? formatTokenAmount(tokenAllowance) : mockTokenAllowance;

  const hasEnoughBalance = tokenBalance
    ? (predictionCost && tokenBalance >= predictionCost)
    : parseFloat(mockBalance) >= parseFloat(mockPredictionCost);

  const hasEnoughAllowance = tokenAllowance
    ? (predictionCost && tokenAllowance >= predictionCost)
    : parseFloat(mockTokenAllowance) >= parseFloat(mockPredictionCost);

  useEffect(() => {
    if (isConfirmed && step === 'transaction') {
      setStep('complete');
      setIsProcessing(false);

      // Update mock balance after successful transaction
      if (!tokenBalance) {
        setMockBalance(prevBalance => {
          const newBalance = parseFloat(prevBalance) - parseFloat(mockPredictionCost);
          return newBalance.toString();
        });
      }

      onPredictionComplete?.();

      // Reset to form state after 2 seconds
      setTimeout(() => {
        setStep('form');
        setIsProcessing(false); // Ensure processing state is reset
      }, 2000);
    }
  }, [isConfirmed, step, onPredictionComplete, tokenBalance, mockPredictionCost]);

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea',
    'Dizziness', 'Chest Pain', 'Shortness of Breath',
    'Abdominal Pain', 'Back Pain', 'Joint Pain', 'Muscle Aches'
  ];

  const addSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !symptoms.includes(customSymptom.trim())) {
      setSymptoms([...symptoms, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const handleGetAnalysis = async () => {
    if (symptoms.length === 0) return;

    try {
      setIsProcessing(true);
      setStep('approval');
      onPredictionStart?.();

      // Create symptom hash (in production, this should be encrypted/hashed)
      const symptomHash = JSON.stringify(symptoms);

      if (predictionCost !== undefined && tokenAllowance !== undefined) {
        // Real contract interaction

        // Step 1: Check if we need approval first
        if (!hasEnoughAllowance) {
          setStep('approval');
          await approveTokens(predictionCostFormatted);

          // Wait a moment for approval to be processed
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Step 2: Request prediction
        setStep('transaction');
        await requestPrediction(symptomHash);

      } else {
        // Mock prediction for development
        setTimeout(() => {
          setStep('transaction');
        }, 1000);

        setTimeout(() => {
          setStep('complete');
          setIsProcessing(false);

          // Update mock balance after successful mock transaction
          setMockBalance(prevBalance => {
            const newBalance = parseFloat(prevBalance) - parseFloat(mockPredictionCost);
            return newBalance.toString();
          });

          onPredictionComplete?.();

          // Reset to form state after 2 seconds
          setTimeout(() => {
            setStep('form');
            setIsProcessing(false); // Ensure processing state is reset
          }, 2000);
        }, 3000);
      }
    } catch (err) {
      console.error('Analysis request failed:', err);
      setStep('form');
      setIsProcessing(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center">
          <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Wallet</h3>
          <p className="text-gray-600 mb-6">Connect your wallet to use AI prediction services</p>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          AI Health Prediction
        </h2>
        <p className="text-gray-600">
          Select symptoms to get AI-powered health insights using blockchain technology
        </p>
      </div>

      {/* Token Balance Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Prediction Cost:</span>
            <span className="ml-2 font-medium">{predictionCostFormatted} BDAG</span>
          </div>
          <div>
            <span className="text-gray-500">Wallet Balance:</span>
            <span className="ml-2 font-medium">{walletBalanceFormatted} BDAG</span>
          </div>
        </div>
        {!hasEnoughBalance && (
          <div className="mt-2 text-amber-600 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Insufficient balance. You need {predictionCostFormatted} BDAG for AI analysis
          </div>
        )}
      </div>

      {/* Symptoms Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Symptoms</h3>

        {/* Selected Symptoms */}
        {symptoms.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected:</h4>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-purple-200"
                  onClick={() => removeSymptom(symptom)}
                >
                  {symptom}
                  <span className="ml-1 text-purple-600">×</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Common Symptoms */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {commonSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => addSymptom(symptom)}
              disabled={symptoms.includes(symptom)}
              className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                symptoms.includes(symptom)
                  ? 'bg-purple-100 text-purple-800 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>

        {/* Custom Symptom Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customSymptom}
            onChange={(e) => setCustomSymptom(e.target.value)}
            placeholder="Add custom symptom..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onKeyDown={(e) => e.key === 'Enter' && addCustomSymptom()}
          />
          <button
            onClick={addCustomSymptom}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Action Button */}
      <div className="space-y-3">
        <button
          onClick={handleGetAnalysis}
          disabled={
            !hasEnoughBalance ||
            symptoms.length === 0 ||
            isPending ||
            isConfirming ||
            isProcessing
          }
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing || isPending || isConfirming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {step === 'approval' && 'Approving Transaction...'}
              {step === 'transaction' && 'Processing Prediction...'}
              {step === 'complete' && 'Analysis Complete!'}
            </>
          ) : (
            <>
              <Brain className="w-4 h-4" />
              Get AI Analysis ({predictionCostFormatted} BDAG)
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error.message}</span>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      {step !== 'form' && step !== 'complete' && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">
              {step === 'approval' && 'Waiting for token approval...'}
              {step === 'transaction' && 'Processing blockchain transaction...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}