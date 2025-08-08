import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroRegistrationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('heroRegistrationPopupShown');
    
    if (!popupShown) {
      // Show popup after 1 second
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('heroRegistrationPopupShown', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRegisterNow = () => {
    setIsVisible(false);
    // Navigate to registration page without preloader
    navigate('/register');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 popup-enter">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-2xl font-bold">🎓 Join TPO Department</h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Become a TPO Member Today!
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Join our Training & Placement Department to access exclusive career opportunities, 
              internships, and professional development programs. Don't miss out on this amazing opportunity!
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-700">Access to top company placements</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-700">Professional skill development</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-700">Networking opportunities</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-700">Career guidance & mentorship</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={handleRegisterNow}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base touch-friendly-button"
            >
              🚀 Register Now
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-gray-200 text-gray-700 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base touch-friendly-button"
            >
              Maybe Later
            </button>
          </div>

          {/* Footer */}
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-xs text-gray-500">
              Registration takes only 2 minutes • 100% Free
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegistrationPopup;


