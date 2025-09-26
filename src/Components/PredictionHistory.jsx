import React from 'react';
import { History, Calendar } from 'lucide-react';

export default function PredictionHistory({ predictions }) {
  if (predictions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
        <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Predictions Yet</h3>
        <p className="text-gray-600">Your health prediction history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">Prediction History</h3>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {predictions.map((prediction) => (
          <div key={prediction.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {prediction.timestamp.toLocaleDateString()}
                </span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                prediction.prediction.severity === 'low' ? 'bg-green-100 text-green-700' :
                prediction.prediction.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {prediction.prediction.severity} risk
              </span>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Symptoms analyzed:</p>
              <div className="flex flex-wrap gap-1">
                {prediction.symptoms.slice(0, 3).map((symptom, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {symptom}
                  </span>
                ))}
                {prediction.symptoms.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{prediction.symptoms.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Confidence: {prediction.prediction.confidence}%
              </span>
              <span className="text-gray-500">
                Cost: {prediction.cost} tokens
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}