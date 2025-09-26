import React from "react";
import StartScreen from "./Pages/StartScreen";
import { Route, Routes } from "react-router-dom";
import HealthPredictionForm from "./Components/HealthPredictionForm";
import AppLayout from "./Pages/AppLayout";
import HomePage from "./Pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />

      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<HomePage />} />
        <Route path="HealthPrediction" element={<HealthPredictionForm />} />
      </Route>
    </Routes>
  );
}
