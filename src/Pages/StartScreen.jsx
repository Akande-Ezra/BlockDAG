import React, { useState } from 'react';
import { Activity, Wallet, Brain, Shield, Sparkles } from 'lucide-react';
import ConnectWalletButton from '@/components/WalletConnector';
import TokenBalance from '@/components/TokenBalance';
import PaymentModal from '@/components/PayementModal';
// import HealthPredictionForm from './components/HealthPredictionForm';
import PredictionResult from '@/components/PredictionResult';
import PredictionHistory from '@/components/PredictionHistory';
import { createUser } from '@/types';
import HealthPredictionForm from '@/Components/HealthPredictionForm';

import { ConnectButton } from '@rainbow-me/rainbowkit';

function StartScreen() {
  const [user, setUser] = useState(createUser());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessingPrediction, setIsProcessingPrediction] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('predict');

  // const handleWalletConnect = (address) => {
  //   setUser(prev => ({ ...prev, address, isAuthenticated: false }));
  // };

  // const handleSign = () => {
  //   setUser(prev => ({ 
  //     ...prev, 
  //     isAuthenticated: true, 
  //     tokens: 100, // Welcome bonus
  //     signupReward: true 
  //   }));
  // };

  const handlePayment = (amount) => {
    setUser(prev => ({ ...prev, tokens: prev.tokens + amount }));
    setShowPaymentModal(false);
  };

  const handlePredict = async (symptoms) => {
    const predictionCost = 50;
    
    if (user.tokens < predictionCost) {
      setShowPaymentModal(true);
      return;
    }

    setIsProcessingPrediction(true);
    setCurrentPrediction(null);

    // Simulate AI prediction processing
    setTimeout(() => {
      const newPrediction = {
        id: Date.now().toString(),
        symptoms,
        prediction: {
          possibleCauses: [
            'Stress-related tension and lifestyle factors',
            'Possible viral infection or immune system response',
            'Sleep deprivation or circadian rhythm disruption',
            'Dehydration or nutritional deficiency'
          ],
          recommendations: [
            'Consult with a healthcare professional for proper diagnosis',
            'Maintain regular sleep schedule (7-9 hours per night)',
            'Stay hydrated and maintain balanced nutrition',
            'Consider stress management techniques like meditation',
            'Monitor symptoms and seek immediate care if they worsen'
          ],
          severity: symptoms.length > 4 ? 'high' : symptoms.length > 2 ? 'medium' : 'low',
          confidence: Math.floor(Math.random() * 20) + 75 // 75-95%
        },
        timestamp: new Date(),
        cost: predictionCost
      };

      setUser(prev => ({ ...prev, tokens: prev.tokens - predictionCost }));
      setCurrentPrediction(newPrediction);
      setPredictionHistory(prev => [newPrediction, ...prev]);
      setIsProcessingPrediction(false);
    }, 4000);
  };

  // const isConnected = !!user.address;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthPredict</h1>
                <p className="text-sm text-gray-600">AI-Powered Health Insights</p>
              </div>
            </div>

            {user.isAuthenticated && (
              <div className="flex items-center gap-4">
                <TokenBalance tokens={user.tokens} hasSignupReward={user.signupReward} />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user.isAuthenticated ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to HealthPredict
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get AI-powered health insights by analyzing your symptoms. Connect your wallet to start your journey towards better health understanding.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white/60 rounded-xl border border-white/40">
                  <Wallet className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Connect Wallet</h3>
                  <p className="text-sm text-gray-600">Secure authentication via wallet signature</p>
                </div>
                
                <div className="text-center p-6 bg-white/60 rounded-xl border border-white/40">
                  <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Free Tokens</h3>
                  <p className="text-sm text-gray-600">Get 100 free tokens on signup</p>
                </div>
                
                <div className="text-center p-6 bg-white/60 rounded-xl border border-white/40">
                  <Brain className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">AI Predictions</h3>
                  <p className="text-sm text-gray-600">Advanced health analysis</p>
                </div>
              </div>
            </div>

            <ConnectWalletButton
n
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Navigation Tabs */}
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setActiveTab('predict')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'predict'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  New Prediction
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'history'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  History
                </button>
              </div>
            </div>

            {activeTab === 'predict' ? (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <HealthPredictionForm
                    onPredict={handlePredict}
                    isProcessing={isProcessingPrediction}
                  />
                </div>
                
                <div>
                  {isProcessingPrediction && (
                    <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Symptoms</h3>
                      <p className="text-gray-600 mb-4">Our AI is processing your health data...</p>
                      <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto">
                        <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse" style={{ width: '100%' }} />
                      </div>
                    </div>
                  )}
                  
                  {currentPrediction && !isProcessingPrediction && (
                    <PredictionResult prediction={currentPrediction} />
                  )}
                  
                  {!currentPrediction && !isProcessingPrediction && (
                    <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Analysis</h3>
                      <p className="text-gray-600">Select your symptoms to get started with AI health prediction.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <PredictionHistory predictions={predictionHistory} />
            )}
          </div>
        )}
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPayment={handlePayment}
        cost={100} // Purchase 100 tokens
      />
    </div>
  );
}

export default StartScreen;