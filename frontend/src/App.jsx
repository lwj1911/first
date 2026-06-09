import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import MainPage from './pages/MainPage.jsx'
import ProtectedRoute from './guards/ProtectedRoute.jsx'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
