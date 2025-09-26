import React, { useState, useEffect } from "react";
import {
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Sun,
  AlertTriangle,
  CheckCircle,
  Activity,
  Settings as Lungs,
  Clock,
} from "lucide-react";

const PredictWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "3fd96df79bb3da94aa95b87dfbc7bc2d";

  // --- Reverse geocoding for more precise location name ---
  const getLocationName = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      const geoData = await res.json();
      return geoData[0]?.name || "Unknown location";
    } catch (err) {
      console.error("Reverse geocode failed:", err);
      return "Unknown location";
    }
  };

  const getWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      // use reverse geocoding instead of just data.name
      const locationName = await getLocationName(lat, lon);

      setWeather({
        location: locationName,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility / 1000, // convert meters → km
        condition: data.weather[0].description,
        uvIndex: Math.floor(Math.random() * 10), // OpenWeather free API doesn’t provide UV
        airQuality: Math.floor(Math.random() * 150), // placeholder (need AQI API)
        pollenCount: Math.floor(Math.random() * 10), // placeholder for health logic
      });
      setLoading(false);
    } catch (err) {
      setError("Unable to fetch weather data.");
      setLoading(false);
    }
  };

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => getWeather(pos.coords.latitude, pos.coords.longitude),
        () => {
          setError("Location permission denied. Using default: London.");
          getWeather(51.5072, -0.1276); // fallback London
        }
      );
    } else {
      setError("Geolocation not supported. Using default: London.");
      getWeather(51.5072, -0.1276);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // --- Health predictions logic stays unchanged ---
  const generateHealthPredictions = (weather) => {
    const predictions = [];

    // Asthma & Allergies
    if (weather.airQuality < 50 || weather.pollenCount > 8) {
      predictions.push({
        condition: "Asthma & Allergies",
        risk: "high",
        recommendation: "Stay indoors, use air purifier, take preventive meds",
        icon: Lungs,
      });
    } else if (weather.airQuality < 80 || weather.pollenCount > 5) {
      predictions.push({
        condition: "Asthma & Allergies",
        risk: "medium",
        recommendation: "Limit outdoor activities, carry inhaler if needed",
        icon: Lungs,
      });
    } else {
      predictions.push({
        condition: "Asthma & Allergies",
        risk: "low",
        recommendation: "Good conditions for outdoor activities",
        icon: Lungs,
      });
    }

    // UV Exposure
    if (weather.uvIndex > 7) {
      predictions.push({
        condition: "UV Exposure",
        risk: "high",
        recommendation: "Wear SPF 30+, seek shade, wear protective clothing",
        icon: Sun,
      });
    } else if (weather.uvIndex > 4) {
      predictions.push({
        condition: "UV Exposure",
        risk: "medium",
        recommendation: "Apply sunscreen, wear sunglasses",
        icon: Sun,
      });
    } else {
      predictions.push({
        condition: "UV Exposure",
        risk: "low",
        recommendation: "Minimal sun protection needed",
        icon: Sun,
      });
    }

    // Dehydration
    if (weather.temperature > 30 && weather.humidity < 40) {
      predictions.push({
        condition: "Dehydration Risk",
        risk: "high",
        recommendation: "Drink water frequently, avoid prolonged sun exposure",
        icon: Droplets,
      });
    } else if (weather.temperature > 25 && weather.humidity < 60) {
      predictions.push({
        condition: "Dehydration Risk",
        risk: "medium",
        recommendation: "Stay hydrated, drink water regularly",
        icon: Droplets,
      });
    } else {
      predictions.push({
        condition: "Dehydration Risk",
        risk: "low",
        recommendation: "Normal hydration needs",
        icon: Droplets,
      });
    }

    // Joint Pain
    if (weather.humidity > 80 && weather.temperature < 15) {
      predictions.push({
        condition: "Joint Pain",
        risk: "medium",
        recommendation: "Keep joints warm, gentle stretching exercises",
        icon: Activity,
      });
    } else {
      predictions.push({
        condition: "Joint Pain",
        risk: "low",
        recommendation: "Weather favorable for joint health",
        icon: Activity,
      });
    }

    return predictions;
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case "high":
        return AlertTriangle;
      case "medium":
        return Clock;
      case "low":
        return CheckCircle;
      default:
        return CheckCircle;
    }
  };

  // --- UI (same as before) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Getting your location...
          </h2>
          <p className="text-gray-500 mt-2">
            Analyzing weather conditions for health insights
          </p>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Unable to load weather data
          </h2>
          <p className="text-gray-500 mt-2">{error}</p>
          <button
            onClick={getLocation}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const healthPredictions = generateHealthPredictions(weather);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weather Health Predictions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered health insights based on your local weather
          </p>
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                {weather.location}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-700">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <Thermometer className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {weather.temperature}°C
              </p>
              <p className="text-sm text-gray-600">Temperature</p>
            </div>
            <div className="text-center">
              <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {weather.humidity}%
              </p>
              <p className="text-sm text-gray-600">Humidity</p>
            </div>
            <div className="text-center">
              <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {weather.windSpeed} m/s
              </p>
              <p className="text-sm text-gray-600">Wind Speed</p>
            </div>
            <div className="text-center">
              <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {weather.uvIndex}
              </p>
              <p className="text-sm text-gray-600">UV Index</p>
            </div>
            <div className="text-center">
              <Eye className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {weather.visibility} km
              </p>
              <p className="text-sm text-gray-600">Visibility</p>
            </div>
            <div className="text-center">
              <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {weather.airQuality}
              </p>
              <p className="text-sm text-gray-600">Air Quality Index</p>
            </div>
          </div>
        </div>

        {/* Health Predictions */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Health Risk Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthPredictions.map((prediction, index) => {
              const RiskIcon = getRiskIcon(prediction.risk);
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border-2 p-6 hover:shadow-xl transition-all duration-300 ${getRiskColor(
                    prediction.risk
                  )}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <prediction.icon className="h-8 w-8 mr-3" />
                      <h3 className="text-xl font-bold">
                        {prediction.condition}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <RiskIcon className="h-5 w-5 mr-1" />
                      <span className="text-sm font-semibold uppercase">
                        {prediction.risk} Risk
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {prediction.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="text-center mt-8">
          <button
            onClick={getLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
          >
            Refresh Location
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
            Set Custom Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictWeather;
