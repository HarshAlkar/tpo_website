import React, { useState, useEffect, useRef } from 'react';
import heroVideo from '../assets/Training & PLACEMENT DEPARTMENT.mp4';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.log('Video failed to load, showing fallback');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Container with Loading State */}
      <div className="absolute inset-0 w-full h-full">
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-accent flex items-center justify-center z-20">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Loading...</p>
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%230f172a'/%3E%3C/svg%3E"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
      
      {/* Optimized background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-purple-500/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-4 sm:left-20 w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full text-center text-white px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins mb-4 sm:mb-6 drop-shadow-lg animate-bounce-in leading-tight">
              
            </h1>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-poppins mb-6 sm:mb-8 animate-fade-in max-w-2xl mx-auto">
              
            </p>
          </div>
          

        </div>
        
        {/* Bottom Content - Career Gateway Button */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col gap-4 items-center">
            <a 
              href="https://tpo.getflytechnologies.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-navy text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl transition-all font-poppins text-lg sm:text-xl hover-lift hover-glow inline-flex items-center gap-3 group"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Career Gateway Student Registration Portal</span>
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a 
              href="/events" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition-all font-poppins text-base sm:text-lg hover-lift hover-glow inline-flex items-center gap-2 group border border-white/30"
            >
              <span>Explore Events</span>
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Performance overlay for better rendering */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
    </section>
  );
} 