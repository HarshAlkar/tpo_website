import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import VideoModal from '../components/VideoModal';

import seminar from '../assets/seminar.svg'
import placemnet from '../assets/placemnet.png'
import tcs from '../assets/tcs.png'
import tpo from '../assets/tpo.png'
// Use external video hosting to avoid deployment issues
const registrationVideo = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'

const events = [
  {
    title: 'Shining Star',
    description: 'Hands-on session to craft a professional resume and LinkedIn profile, led by industry experts.',
    date: '28 February 2024',
    image: seminar,
    link: 'https://www.instagram.com/p/DM5tuHXsPAf/',
    category: 'Training',
    participants: '80+',
  },
  {
    title: 'Elaine Kildsig,Senior International Student Recruiter from the University of Texas at Arlington (UTA) ',
    description: 'Get career guidance and industry insights from our successful alumni.',
    date: '5 January 2024',
    image: 'https://i.ytimg.com/vi/u5W0AJXsp4c/maxresdefault.jpg',
    link: 'https://www.instagram.com/p/DMRx6xHtQmZ/',
    category: 'Networking',
    participants: '120+',
  },
  {
    title: ' 3 Days of Career Transformation!',
    description: 'Sharpen your logical and quantitative skills with our intensive aptitude bootcamp.',
    date: '10 February 2024',
    image: tpo,
    link: 'https://www.instagram.com/p/DKheGwztcQR/',
    category: 'Bootcamp',
    participants: '200+',
  },
];

const placementDrives = [
  {
    title: 'Mock Placement Drive 2025',
    description: 'Simulate real interview experience with top recruiters and alumni. Boost your confidence and get placement-ready!',
    date: '15 March 2024',
    image: 'data:image/png;base64,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',
    link: 'https://www.instagram.com/p/DMm9Ejis8sU/',
    category: 'Workshop',
    participants: '150+',
  },
  {
    title: 'TCS Mock Drive for students shortlisted ',
    description: 'Strategy. Logic. Precision. 🧠💼 - Sharpen your logical and quantitative skills with our intensive aptitude bootcamp.',
    date: '10 February 2024',
    image: tcs,
    link: 'https://www.instagram.com/p/DKEQ8FpMUWX/',
    category: 'Placement',
    participants: '200+',
  },
  {
    title: 'Wissen Tech Campus Placement',
    description: 'Get career guidance and industry insights from our successful alumni.',
    date: '5 January 2024',
    image: placemnet,
    link: 'https://www.instagram.com/p/DMRx6xHtQmZ/',
    category: 'Placement',
    participants: '120+',
  },
];

export default function Events() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-br from-[#f3e8ff] via-[#e0e7ff] to-[#f8fafc]">
      <Navbar />
      <div className="pt-20 sm:pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4 animate-fade-in-up">
            Events & Placement Drives
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Explore our latest events, workshops, and placement drives designed to empower students for successful careers.
          </p>
          
          {/* Header Stats and Video Section */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mb-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="bg-white/60 backdrop-blur-lg rounded-full px-4 sm:px-6 py-2 shadow-lg hover-lift transition-all duration-300">
                <span className="text-purple-700 font-semibold text-sm sm:text-base">6 Total Events</span>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-full px-4 sm:px-6 py-2 shadow-lg hover-lift transition-all duration-300">
                <span className="text-blue-700 font-semibold text-sm sm:text-base">550+ Participants</span>
              </div>
            </div>
            
            {/* Video Player Button */}
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <div className="relative bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl p-4 text-center hover-lift transition-all duration-300 hover-glow min-w-[280px]">
                <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white">Registration Guide</h3>
                    <p className="text-white/90 text-xs">Watch Tutorial Video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Events Column */}
          <div className={`animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.6s'}}>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-6">
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                Events & Workshops
              </h2>
              <p className="text-gray-600 mb-6">Professional development workshops and skill-building sessions</p>
            </div>

            <div className="space-y-6">
              {events.map((event, idx) => (
                <a
                  key={event.title}
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden group transition-all duration-300 hover-lift hover-glow animate-fade-in-up block"
                  style={{ animationDelay: `${(idx + 1) * 0.2}s` }}
                  onMouseEnter={() => setSelectedEvent(event.title)}
                  onMouseLeave={() => setSelectedEvent(null)}
                >
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-40 sm:h-48 md:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-white/20">
                      {event.date}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/30">
                      {event.participants}
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/30">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-navy mb-2 font-poppins group-hover:text-purple-700 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 font-poppins mb-4 text-sm">{event.description}</p>
                    
                    <div className="flex gap-2">
                      <a 
                        href={event.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full shadow transition-all text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </a>
                      {/* <a 
                        href={event.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-accent text-white font-semibold px-4 py-2 rounded-full shadow transition-all text-sm"
                      >
                        Learn More
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a> */}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Placement Drives Column */}
          <div className={`animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.8s'}}>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-6">
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                  </svg>
                </div>
                Placement Drives
              </h2>
              <p className="text-gray-600 mb-6">Campus recruitment drives and mock placement sessions</p>
            </div>

            <div className="space-y-6">
              {placementDrives.map((drive, idx) => (
                <a
                  key={drive.title}
                  href={drive.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden group transition-all duration-300 hover-lift hover-glow animate-fade-in-up block"
                  style={{ animationDelay: `${(idx + 1) * 0.2}s` }}
                  onMouseEnter={() => setSelectedEvent(drive.title)}
                  onMouseLeave={() => setSelectedEvent(null)}
                >
                  <div className="relative">
                    <img 
                      src={drive.image} 
                      alt={drive.title} 
                      className="w-full h-40 sm:h-48 md:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-white/20">
                      {drive.date}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/30">
                      {drive.participants}
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/30">
                        {drive.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-navy mb-2 font-poppins group-hover:text-blue-700 transition-colors duration-300">
                      {drive.title}
                    </h3>
                    <p className="text-gray-700 font-poppins mb-4 text-sm">{drive.description}</p>
                    
                    <div className="flex gap-2">
                      <a 
                        href={drive.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full shadow transition-all text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </a>
                      {/* <a 
                        href={drive.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-accent text-white font-semibold px-4 py-2 rounded-full shadow transition-all text-sm"
                      >
                        Learn More
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a> */}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 sm:mt-16 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '1s'}}>
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl hover-lift transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4">Stay Updated</h3>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">Get notified about upcoming events and placement drives</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 border rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover-lift text-sm sm:text-base"
              />
              <button className="bg-accent hover:bg-navy text-white font-semibold px-4 sm:px-6 py-2 rounded-full transition-all hover-lift hover-glow group text-sm sm:text-base">
                Subscribe
                <svg className="w-3 h-3 sm:w-4 sm:h-4 inline ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={registrationVideo}
        title="Registration Process Guide"
      />
    </div>
  );
} 