import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Contact from './pages/Contact';
import WhyUs from './pages/WhyUs';
import Events from './pages/Events';
import Committee from './pages/Committee';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import RegistrationPopup from './components/RegistrationPopup';
import FloatingRegisterButton from './components/FloatingRegisterButton';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasInitialLoad(true);
    // Add a small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  // Show preloader only on initial load
  if (isLoading && !hasInitialLoad) {
    return <Preloader onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/committee" element={<Committee />} />
          {/* Other routes: Register, Contact, etc. */}
        </Routes>
        <RegistrationPopup />
        <FloatingRegisterButton />
      </Router>
    </div>
  );
}