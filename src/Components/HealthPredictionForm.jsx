import React, { useState } from "react";
import { Brain, Shield } from "lucide-react";
import PredictionResult from "@/Components/PredictionResult";
import PredictionHistory from "@/components/PredictionHistory";
import PaymentModal from "@/components/PayementModal";
import HealthForm from "@/Components/HealthForm";

function App() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessingPrediction, setIsProcessingPrediction] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("predict");
  const [tokens, setTokens] = useState(100); // optional token system

  const handlePayment = (amount) => {
    setTokens((prev) => prev + amount);
    setShowPaymentModal(false);
  };

  const handlePredict = async (symptoms) => {
    const predictionCost = 50;

    if (tokens < predictionCost) {
      setShowPaymentModal(true);
      return;
    }

    setIsProcessingPrediction(true);
    setCurrentPrediction(null);

    // Simulate AI prediction
    setTimeout(() => {
      const newPrediction = {
        id: Date.now().toString(),
        symptoms,
        prediction: {
          possibleCauses: [
            "Stress-related tension and lifestyle factors",
            "Possible viral infection or immune system response",
            "Sleep deprivation or circadian rhythm disruption",
            "Dehydration or nutritional deficiency",
          ],
          recommendations: [
            "Consult with a healthcare professional for proper diagnosis",
            "Maintain regular sleep schedule (7-9 hours per night)",
            "Stay hydrated and maintain balanced nutrition",
            "Consider stress management techniques like meditation",
            "Monitor symptoms and seek immediate care if they worsen",
          ],
          severity:
            symptoms.length > 4
              ? "high"
              : symptoms.length > 2
              ? "medium"
              : "low",
          confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
        },
        timestamp: new Date(),
        cost: predictionCost,
      };

      setTokens((prev) => prev - predictionCost);
      setCurrentPrediction(newPrediction);
      setPredictionHistory((prev) => [newPrediction, ...prev]);
      setIsProcessingPrediction(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">HealthPredict</h1>
            <p className="text-sm text-gray-600">AI-Powered Health Insights</p>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setActiveTab("predict")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "predict"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              New Prediction
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "history"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              History
            </button>
          </div>
        </div>

        {activeTab === "predict" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <HealthForm
              onPredict={handlePredict}
              isProcessing={isProcessingPrediction}
            />

            <div>
              {isProcessingPrediction && (
                <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Analyzing Symptoms
                  </h3>
                  <p className="text-gray-600 mb-4">
                    AI is processing your health data...
                  </p>
                  <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse w-full" />
                  </div>
                </div>
              )}

              {currentPrediction && !isProcessingPrediction && (
                <PredictionResult prediction={currentPrediction} />
              )}

              {!currentPrediction && !isProcessingPrediction && (
                <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-gray-600">
                    Select your symptoms to get started with AI health
                    prediction.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <PredictionHistory predictions={predictionHistory} />
        )}
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPayment={handlePayment}
        cost={100}
      />
    </div>
  );
}

export default App;
