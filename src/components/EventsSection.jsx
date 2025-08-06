import React, { useState, useEffect } from 'react';

const events = [
  {
    title: 'Shining Star',
    description: 'Learn how to craft a professional resume with industry experts.',
    date: '2024-04-10',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '2:30',
    views: '1.2K',
    likes: '89',
    category: 'Workshop',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Mock Drive ',
    description: 'Simulated interviews with real recruiters to boost your confidence.',
    date: '2024-03-22',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    duration: '3:45',
    views: '2.1K',
    likes: '156',
    category: 'Training',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Godrej Infotech Campus Placement Drive – Strategy. Logic. Precision. 🧠💼',
    description: 'Meet and network with top industry professionals and alumni.',
    date: '2024-02-15',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    duration: '4:20',
    views: '3.5K',
    likes: '234',
    category: 'Networking',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    title: 'AWissen Tech Campus Placement Journey',
    description: 'Sharpen your aptitude and reasoning skills for campus placements.',
    date: '2024-01-30',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4',
    duration: '5:15',
    views: '4.2K',
    likes: '312',
    category: 'Training',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Coding Bootcamp',
    description: 'Intensive coding sessions to prepare for technical interviews.',
    date: '2024-05-15',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '6:30',
    views: '5.8K',
    likes: '445',
    category: 'Technical',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Soft Skills Masterclass',
    description: 'Develop communication and leadership skills for corporate success.',
    date: '2024-06-20',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    duration: '3:55',
    views: '2.7K',
    likes: '198',
    category: 'Development',
    gradient: 'from-yellow-500 to-orange-500',
  },
];

export default function EventsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section id="events" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4 font-poppins">
            Events & Workshops
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest training sessions, workshops, and networking events designed to boost your career
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Video Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <video 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={event.video}
                  loop
                  muted
                  playsInline
                  autoPlay={hoveredCard === idx}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${event.gradient} opacity-60`}></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                  {event.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {event.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-navy font-poppins group-hover:text-blue-800 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Stats Row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      <span>{event.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{event.likes}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="bg-gradient-to-r from-navy to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Join Event
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-navy to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2">
            <span>View All Events</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
} 