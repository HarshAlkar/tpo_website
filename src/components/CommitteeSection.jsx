import React, { useState, useEffect } from 'react';

const committee = [
  {
    name: 'Dr. Priya Sharma',
    role: 'TPO Officer',
    year: '2024',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    department: 'Computer Science',
    email: 'priya.sharma@college.edu',
  },
  {
    name: 'Amit Verma',
    role: 'Student Coordinator',
    year: 'Final Year',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    department: 'Information Technology',
    email: 'amit.verma@student.edu',
  },
  {
    name: 'Sneha Patel',
    role: 'Student Coordinator',
    year: 'Third Year',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    department: 'Electronics',
    email: 'sneha.patel@student.edu',
  },
  {
    name: 'Rahul Singh',
    role: 'Student Coordinator',
    year: 'Second Year',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    department: 'Mechanical',
    email: 'rahul.singh@student.edu',
  },
];

export default function CommitteeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="committee" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6 font-poppins animate-fade-in-up">
            Current Committee
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 animate-fade-in-up max-w-3xl mx-auto" style={{animationDelay: '0.2s'}}>
            Our dedicated team of faculty and student coordinators working together to ensure your success
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 stagger-animation">
          {committee.map((member, idx) => (
            <div 
              key={idx} 
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center transition-all duration-300 hover-lift hover-glow group animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${(idx + 1) * 0.2}s` }}
              onMouseEnter={() => setSelectedMember(member.name)}
              onMouseLeave={() => setSelectedMember(null)}
            >
              <div className="relative mb-4">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-full border-4 border-accent transition-transform duration-300 group-hover:scale-110" 
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold text-navy mb-1 font-poppins group-hover:text-purple-700 transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-accent font-medium font-poppins mb-1 text-sm sm:text-base">{member.role}</p>
              <p className="text-gray-600 font-poppins mb-2 text-xs sm:text-sm">{member.department}</p>
              <span className="text-gray-500 font-poppins text-xs sm:text-sm">{member.year}</span>
              
              {/* Hover effect indicator */}
              <div className="mt-4 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
              
              {/* Contact info on hover */}
              <div className={`mt-3 text-xs text-gray-500 transition-all duration-300 ${selectedMember === member.name ? 'opacity-100' : 'opacity-0'}`}>
                <p>{member.email}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className={`mt-12 sm:mt-16 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '1s'}}>
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl hover-lift transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4 sm:mb-6 text-center">Committee Responsibilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-navy mb-2 text-sm sm:text-base">Student Support</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Providing guidance and support to students throughout their placement journey</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h4z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-navy mb-2 text-sm sm:text-base">Event Management</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Organizing workshops, training sessions, and placement drives</p>
              </div>
              
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-navy mb-2 text-sm sm:text-base">Quality Assurance</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Ensuring high standards in training and placement processes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 