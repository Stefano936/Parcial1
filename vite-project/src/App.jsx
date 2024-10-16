import React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import Detalles from './pages/Detalles/Detalles.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Detalles/:id" element={<Detalles />} />
      </Routes>
    </>
  )
}

export default App