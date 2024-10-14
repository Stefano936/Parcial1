import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import Detalles from './pages/Detalles/Detalles.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Detalles" element={<Detalles />} />
      </Routes>
    </>
  )
}

export default App