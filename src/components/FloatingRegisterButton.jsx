import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingRegisterButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-pointer touch-friendly"
      >
        {/* Main Button */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 cursor-pointer floating-button-pulse touch-friendly-button">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>

        {/* Tooltip */}
        <div className={`absolute bottom-full right-0 mb-2 sm:mb-3 px-3 sm:px-4 py-2 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <div className="text-xs sm:text-sm font-semibold">Join TPO Now!</div>
          <div className="text-xs text-gray-600">Register for free</div>
          
          {/* Arrow */}
          <div className="absolute top-full right-3 sm:right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>

        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
      </div>
    </div>
  );
};

export default FloatingRegisterButton;
