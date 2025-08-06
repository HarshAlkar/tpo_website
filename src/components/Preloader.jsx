import React, { useState, useEffect } from 'react';
import logoImage from '../assets/TPO_logo.svg';

export default function Preloader({ onLoadingComplete }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [logoScale, setLogoScale] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [circuitParticles, setCircuitParticles] = useState([]);
  const [dataStreams, setDataStreams] = useState([]);

  // Generate circuit particles
  useEffect(() => {
    const newCircuitParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      color: ['#3B82F6', '#1E40AF', '#6366F1', '#8B5CF6', '#06B6D4'][Math.floor(Math.random() * 5)],
      speed: Math.random() * 3 + 2,
      delay: Math.random() * 2000,
    }));
    setCircuitParticles(newCircuitParticles);
  }, []);

  // Generate data streams
  useEffect(() => {
    const newDataStreams = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50,
      width: Math.random() * 3 + 1,
      height: Math.random() * 100 + 50,
      color: ['#3B82F6', '#1E40AF', '#6366F1'][Math.floor(Math.random() * 3)],
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 1000,
    }));
    setDataStreams(newDataStreams);
  }, []);

  useEffect(() => {
    // Initial animation sequence
    const timer1 = setTimeout(() => setLogoScale(1), 200);
    const timer2 = setTimeout(() => setTextOpacity(1), 1000);

    // Progress animation
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Smooth fade out
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onLoadingComplete();
            }, 600);
          }, 1200);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden">
      {/* Technical background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Circuit particles */}
      <div className="absolute inset-0 pointer-events-none">
        {circuitParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}ms`,
              animationDuration: `${particle.speed}s`,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`
            }}
          />
        ))}
      </div>

      {/* Data streams */}
      <div className="absolute inset-0 pointer-events-none">
        {dataStreams.map((stream) => (
          <div
            key={stream.id}
            className="absolute animate-pulse"
            style={{
              left: `${stream.x}px`,
              top: `${stream.y}px`,
              width: `${stream.width}px`,
              height: `${stream.height}px`,
              backgroundColor: stream.color,
              animationDelay: `${stream.delay}ms`,
              animationDuration: `${stream.speed}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* 3D Technology Models */}
      <div className="absolute inset-0 pointer-events-none">
        {/* CPU Model */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg transform rotate-45"></div>
          <div className="absolute inset-2 bg-blue-300 rounded-md"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-blue-100 rounded-full"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-blue-100 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-100 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-100 rounded-full"></div>
        </div>

        {/* Memory Module */}
        <div className="absolute top-40 right-20 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-12 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-lg"></div>
          <div className="absolute inset-1 bg-purple-300 rounded-md"></div>
          <div className="absolute top-2 left-2 w-1 h-1 bg-purple-100 rounded-full"></div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-purple-100 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-100 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-purple-100 rounded-full"></div>
        </div>

        {/* Circuit Board */}
        <div className="absolute bottom-20 left-1/4 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-20 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-lg"></div>
          <div className="absolute inset-2 bg-green-300 rounded-md"></div>
          <div className="absolute top-3 left-3 w-3 h-1 bg-green-100 rounded-full"></div>
          <div className="absolute top-6 left-3 w-3 h-1 bg-green-100 rounded-full"></div>
          <div className="absolute top-9 left-3 w-3 h-1 bg-green-100 rounded-full"></div>
          <div className="absolute top-3 right-3 w-1 h-3 bg-green-100 rounded-full"></div>
          <div className="absolute top-6 right-3 w-1 h-3 bg-green-100 rounded-full"></div>
        </div>

        {/* Network Hub */}
        <div className="absolute bottom-40 right-1/4 animate-float" style={{animationDelay: '0.5s'}}>
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full shadow-lg"></div>
          <div className="absolute inset-3 bg-cyan-300 rounded-full"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-100 rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-100 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-100 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-100 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Central Logo Container */}
        <div className="relative mb-12">
          {/* Technical glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse-slow"></div>
          
          {/* Logo with technical scale animation */}
          <div 
            className="w-32 h-32 sm:w-40 sm:h-40 relative transition-all duration-1000 ease-out"
            style={{ 
              transform: `scale(${logoScale})`,
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
            }}
          >
            <img
              src={logoImage}
              alt="PVPPCOE T.P.O. Logo"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Technical rotating rings around logo */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-full h-full border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"></div>
          </div>
          
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
            <div className="w-full h-full border-2 border-transparent border-t-cyan-500 border-r-blue-500 rounded-full"></div>
          </div>
          
          {/* Circuit pattern ring */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="w-full h-full border border-blue-400/30 rounded-full"></div>
          </div>
        </div>

        {/* Loading text with technical animations */}
        <div 
          className="text-center mb-8 transition-all duration-1000 ease-out"
          style={{ opacity: textOpacity }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 animate-pulse">
            Training & Placement Department
          </h2>
          {/* <p className="text-blue-600 text-sm sm:text-base animate-pulse" style={{animationDelay: '0.5s'}}>
            ⚡ Initializing System ⚡
          </p> */}
        </div>

        {/* Technical progress bar */}
        <div className="w-64 sm:w-80 mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${loadingProgress}%` }}
            >
              {/* Circuit pattern overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)
                `,
                backgroundSize: '20px 20px',
                animation: 'shimmer 2s linear infinite'
              }}></div>
            </div>
          </div>
        </div>

        {/* Progress percentage with technical styling */}
        <div 
          className="text-gray-700 font-bold text-lg mb-4 transition-all duration-1000 ease-out"
          style={{ opacity: textOpacity }}
        >
          {Math.round(loadingProgress)}%
        </div>

        {/* Technical loading indicator */}
        <div 
          className="flex space-x-2 mt-6 transition-all duration-1000 ease-out"
          style={{ opacity: textOpacity }}
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '200ms'}}></div>
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '400ms'}}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '600ms'}}></div>
        </div>

        {/* Technical status text */}
        {/* <div className="mt-4 text-blue-600 text-sm font-mono">
          {loadingProgress < 30 && "🔧 Initializing core systems..."}
          {loadingProgress >= 30 && loadingProgress < 60 && "⚡ Loading modules..."}
          {loadingProgress >= 60 && loadingProgress < 90 && "🔗 Establishing connections..."}
          {loadingProgress >= 90 && "✅ System ready..."}
        </div> */}
      </div>

             {/* Smooth fade out overlay */}
       <div 
         className={`absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 transition-all duration-1000 ease-in-out ${
           loadingProgress >= 100 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
         }`}
       ></div>
    </div>
  );
} 