import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CommitteeSection from '../components/CommitteeSection';

export default function Committee() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-poppins bg-gradient-to-br from-[#f3e8ff] via-[#e0e7ff] to-[#f8fafc] min-h-screen">
      <Navbar />
      <div className="pt-20 sm:pt-24 pb-8">
        <div className={`text-center mb-8 sm:mb-12 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 animate-fade-in-up">
            Current Committee
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Meet the dedicated team behind our Training and Placement Department
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="bg-white/60 backdrop-blur-lg rounded-full px-4 sm:px-6 py-2 shadow-lg hover-lift transition-all duration-300">
              <span className="text-purple-700 font-semibold text-sm sm:text-base">Faculty Members</span>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-full px-4 sm:px-6 py-2 shadow-lg hover-lift transition-all duration-300">
              <span className="text-blue-700 font-semibold text-sm sm:text-base">Student Representatives</span>
            </div>
          </div>
        </div>
        <CommitteeSection />
      </div>
    </div>
  );
} 