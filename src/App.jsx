import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PermanentDebtSection from './demos/permanent-debt/PermanentDebtSection'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/permanent-debt" replace />} />
        <Route path="/permanent-debt" element={<PermanentDebtSection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
