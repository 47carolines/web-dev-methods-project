import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import QuoteWizard from './components/wizard/QuoteWizard.tsx'
import MainLayout from './components/layout/MainLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="quote/:step" element={<QuoteWizard />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>
)