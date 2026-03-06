import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import QuoteForm from './pages/QuoteForm'
import QuoteResult from './pages/QuoteResult'
import LandingPage from './pages/LandingPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="quote-form" element={<QuoteForm />} />
          <Route path="quote-result" element={<QuoteResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)