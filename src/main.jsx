import './index.css'
import App from './App.jsx'
import 'aos/dist/aos.css';
import AOS from 'aos';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function AppWithAOS() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithAOS />
  </React.StrictMode>
);
