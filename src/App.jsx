import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import SignUpPage from './pages/SignUpPage';
import DashBoard from './pages/Dashboard';
import SessionPage from './pages/SessionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/sesh" element={<SessionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
