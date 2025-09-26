import React, { useState } from 'react';
import { Wallet, Shield, CheckCircle } from 'lucide-react';

export default function WalletConnector({ 
  onConnect, 
  onSign, 
  isConnected, 
  isAuthenticated, 
  address 
}) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = '0x742d35Cc0F35C2EC9d8F6BC1eEDBeC3eC3a5F89B';
      onConnect(mockAddress);
      setIsConnecting(false);
    }, 2000);
  };

  const handleSign = async () => {
    setIsSigning(true);
    // Simulate signature process
    setTimeout(() => {
      onSign();
      setIsSigning(false);
    }, 3000);
  };

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">
            Connect your crypto wallet to access the health prediction platform
          </p>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Identity</h3>
          <p className="text-gray-600 mb-2">
            Sign a message to verify your wallet ownership
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Address: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
          <button
            onClick={handleSign}
            disabled={isSigning}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {isSigning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Sign Message
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
      <div className="flex items-center justify-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-green-800 font-medium">Wallet Connected</span>
        <span className="text-sm text-green-600">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
    </div>
  );
}