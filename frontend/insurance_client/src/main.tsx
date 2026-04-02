import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import QuoteWizard from './components/wizard/QuoteWizard.tsx';
import MainLayout from './components/layout/MainLayout.tsx';
import Submissions from './pages/Submissions.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="quote/:step" element={<QuoteWizard />} />
            <Route path="submissions" element={<Submissions />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);