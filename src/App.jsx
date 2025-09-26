import React from 'react'
import StartScreen from './Pages/StartScreen'
import { Route, Routes } from 'react-router-dom'
import HealthPredictionForm from './Components/HealthPredictionForm'
import AppLayout from './Pages/AppLayout'
import HomePage from './Pages/HomePage'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<StartScreen/> } />
      
      {/* Dashboard Layout */}
      <Route path='/dashboard' element={<AppLayout/> }>
        <Route index element={<HomePage/>} />
        <Route path='HealthPrediction' element={<HealthPredictionForm /> } />
        {/* ✅ relative path, not /HealthPrediction */}
      </Route>
    </Routes>
  )
}
