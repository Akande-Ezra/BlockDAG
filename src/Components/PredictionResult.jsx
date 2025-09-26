import React from 'react';
import { AlertTriangle, CheckCircle, Info, Clock } from 'lucide-react';

export default function PredictionResult({ prediction }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">Health Prediction Results</h3>
            <div className="flex items-center gap-2 text-purple-100">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{prediction.timestamp.toLocaleString()}</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full border ${getSeverityColor(prediction.prediction.severity)} bg-white/20 border-white/30`}>
            <div className="flex items-center gap-1">
              {getSeverityIcon(prediction.prediction.severity)}
              <span className="text-sm font-medium capitalize text-white">
                {prediction.prediction.severity} Risk
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Symptoms */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Analyzed Symptoms</h4>
          <div className="flex flex-wrap gap-2">
            {prediction.symptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>

        {/* Possible Causes */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Possible Causes</h4>
          <div className="space-y-2">
            {prediction.prediction.possibleCauses.map((cause, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-800">{cause}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommended Actions</h4>
          <div className="space-y-2">
            {prediction.prediction.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">AI Confidence Score</span>
            <span className="text-sm font-bold text-gray-900">{prediction.prediction.confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${prediction.prediction.confidence}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            This prediction is based on AI analysis of your symptoms. Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}