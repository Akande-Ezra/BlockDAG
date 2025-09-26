import React, { useState } from 'react';
import { Brain, Plus, X, Zap } from 'lucide-react';

const COMMON_SYMPTOMS = [
  'Headache',
  'Fatigue',
  'Nausea',
  'Fever',
  'Cough',
  'Shortness of breath',
  'Chest pain',
  'Back pain',
  'Joint pain',
  'Dizziness',
  'Sleep issues',
  'Anxiety'
];

export default function HealthForm({ onPredict, isProcessing }) {
  const [symptoms, setSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState('');

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
      addSymptom(customSymptom.trim());
      setCustomSymptom('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptoms.length > 0) {
      onPredict(symptoms);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Health Prediction Analysis</h3>
          <p className="text-sm text-gray-600">Describe your symptoms for AI-powered insights</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Selected Symptoms */}
        {symptoms.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms:</h4>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {symptom}
                  <button
                    type="button"
                    onClick={() => removeSymptom(symptom)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Common Symptoms */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Common Symptoms:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_SYMPTOMS.map((symptom) => (
              <button
                key={symptom}
                type="button"
                onClick={() => addSymptom(symptom)}
                disabled={symptoms.includes(symptom)}
                className="text-left px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Symptom Input */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Add Custom Symptom:</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="Enter a specific symptom..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSymptom())}
            />
            <button
              type="button"
              onClick={addCustomSymptom}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={symptoms.length === 0 || isProcessing}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Get AI Prediction (50 tokens)
            </>
          )}
        </button>
      </form>
    </div>
  );
}