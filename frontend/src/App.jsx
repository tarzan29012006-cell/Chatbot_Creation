import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChatButton from './components/FloatingChatButton';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import CampusLifePage from './pages/CampusLifePage';
import ContactPage from './pages/ContactPage';
import AssistantPage from './pages/AssistantPage';

export default function App() {
  const location = useLocation();
  const isAssistantPage = location.pathname === '/assistant';

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-white">
      {/* TopBar & Navbar for normal pages */}
      {!isAssistantPage && (
        <>
          <TopBar />
          <Navbar />
        </>
      )}

      {/* Main Page Body */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/campus-life" element={<CampusLifePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
      </div>

      {/* Floating Chat Button on every page EXCEPT /assistant */}
      {!isAssistantPage && <FloatingChatButton />}

      {/* Footer on normal pages */}
      {!isAssistantPage && <Footer />}
    </div>
  );
}
