import React from 'react';
import { Coins, Gift } from 'lucide-react';

export default function TokenBalance({ tokens, hasSignupReward }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Health Tokens</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{tokens.toLocaleString()}</div>
          <p className="text-sm text-gray-600">Available for predictions</p>
        </div>
        
        {hasSignupReward && (
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-2">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-purple-600 font-medium">Welcome Bonus!</span>
          </div>
        )}
      </div>
    </div>
  );
}