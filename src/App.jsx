import React from "react";
import StartScreen from "@/Pages/StartScreen";
import { Route, Routes } from "react-router-dom";
import HealthPredictionForm from "@/Components/HealthPredictionForm";
import AppLayout from "@/Pages/AppLayout";
import HomePage from "@/Pages/HomePage";
import WeatherPrediction from "@/Pages/WeatherPrediction";
import TrendingNow from "@/Pages/TrendingNow";
import HealthBlog from "@/Pages/HealthBlog";
import Wallet from "@/Pages/Wallet";
import History from "@/Pages/History";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />

      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<HomePage />} />
        <Route path="HealthPrediction" element={<HealthPredictionForm />} />
        <Route path="WeatherPrediction" element={<WeatherPrediction />} />
        <Route path="Trending" element={<TrendingNow />} />
        <Route path="HealthBlog" element={<HealthBlog />} />
        <Route path="Wallet" element={<Wallet />} />
        <Route path="History" element={<History />} />
      </Route>
    </Routes>
  );
}
