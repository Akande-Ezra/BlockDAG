import React, { useState } from 'react';
import { CreditCard, X, CheckCircle } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, onPayment, cost }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        onPayment(cost);
        setIsComplete(false);
        onClose();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Payment Required</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isComplete ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-green-600 mb-2">Payment Successful!</h4>
            <p className="text-gray-600">Your tokens have been added to your balance.</p>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Health Prediction Access</span>
                <span className="font-semibold">{cost} Tokens</span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">{cost} Tokens</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Pay {cost} Tokens
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}