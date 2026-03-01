import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import QuoteForm from './pages/QuoteForm'
import QuoteResult from './pages/QuoteResult'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quote-form" element={<QuoteForm />} />
          <Route path="/quote-result" element={<QuoteResult />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
