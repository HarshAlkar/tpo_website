import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import asmitaImg from '../assets/TESTMONIAL/ASMITA.jpeg';
import purvaImg from '../assets/TESTMONIAL/Purva.jpeg';  
import eshwariImg from '../assets/TESTMONIAL/Eshwari.jpeg';
import pranavImg from '../assets/TESTMONIAL/pravna.jpeg';
import akashImg from '../assets/TESTMONIAL/akash.jpeg';


const features = [
  {
    title: 'Placement Excellence',
    description: 'Exclusive campus drives and personalized placement support with top companies.',
    icon: '🎯',
    color: 'from-purple-500 to-pink-600',
    stats: '180+ Companies'
  },
  {
    title: 'Industry Training',
    description: 'Workshops with industry leaders, internship opportunities, and skill development bootcamps.',
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    stats: '50+ Workshops'
  },
  {
    title: 'Resume Building',
    description: '1:1 resume review sessions, LinkedIn profile optimization, and portfolio building guidance.',
    icon: '📄',
    color: 'from-green-500 to-emerald-600',
    stats: '1000+ Resumes'
  },
  {
    title: 'Expert Mentorship',
    description: 'Guidance from alumni and professionals, mock interviews, and career counseling.',
    icon: '👥',
    color: 'from-orange-500 to-red-600',
    stats: '200+ Mentors'
  },
];

const stats = [
  { label: 'Companies', value: '180+', icon: '🏢', color: 'from-blue-500 to-indigo-600' },
  { label: 'Students Placed', value: '804+', icon: '👥', color: 'from-green-500 to-emerald-600' },
  { label: 'Highest Package', value: '32.57 LPA', icon: '💰', color: 'from-yellow-500 to-orange-600' },
  { label: 'Internships', value: '739+', icon: '🎯', color: 'from-purple-500 to-pink-600' },
];

const benefits = [
  {
    title: 'Personalized Approach',
    description: 'Every student gets individual attention and customized career guidance based on their skills and aspirations.',
    icon: '❤️',
    color: 'from-rose-500 to-pink-600'
  },
  {
    title: 'Industry Connect',
    description: 'Strong partnerships with leading companies ensure students get access to the best opportunities.',
    icon: '⭐',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    title: 'Innovation & Technology',
    description: 'Cutting-edge tools and platforms for modern career development and skill enhancement.',
    icon: '✨',
    color: 'from-violet-500 to-purple-600'
  },
  {
    title: 'Award-Winning Excellence',
    description: 'Recognized for outstanding placement performance and student success rates.',
    icon: '🏆',
    color: 'from-emerald-500 to-green-600'
  }
];

const testimonials = [
  {
    name: 'Asmita Ghode',
    role: 'Sr. Executive at Godrej Infotech Ltd',
    year: '2025 Batch',
    quote: 'The TPO department helped me secure my dream job. Their guidance was invaluable.',
    image: asmitaImg,
    company: 'Godrej Infotech Ltd',
    package: '₹4 LPA'
  },
  {
    name: 'Purva Nagap',
    role: 'SDT - Technology & Development ',
    year: '2025 Batch',
    quote: 'The training programs and mock interviews prepared me perfectly for the industry.',
    image: purvaImg,
    company: 'Kytes',
    package: '₹12.5 LPA'
  },
  {
    name: 'Eshwari Rampoore',
    role: 'Associate Software Engineer',
    year: '2025 Batch',
    quote: 'From resume building to final placement, the TPO department was with me every step.',
    image: eshwariImg,
    company: 'NiCE',
    package: '₹8 LPA'
  },
  {
    name: 'Pranav Yamageka',
    role: 'Full Stack Developer at Infosys',
    year: '2024 Batch',
    quote: 'The TPO team\'s dedication to student success is unmatched.',
    image: pranavImg,
    company: 'ICIC',
    package: '₹5 LPA'
  },
  {
    name: 'Akash Nahak',
    role: 'DevOps Engineer at TCS',
    year: '2022 Batch',
    quote: 'Excellent career guidance and placement support. The TPO department truly cares.',
    image: akashImg,
    company: 'Wissen',
    package: '₹6.5 LPA'
  },
  {
    name: 'Arjun Mehta',
    role: 'Machine Learning Engineer',
    company: 'Wipro',
    package: '₹15 LPA',
    quote: 'The skill development programs and industry connections were crucial for my career growth.',
    image: 'https://randomuser.me/api/portraits/men/23.jpg'
  },
  {
    name: 'Sneha Reddy',
    role: 'UI/UX Designer',
    company: 'Cognizant',
    package: '₹14 LPA',
    quote: 'TPO\'s personalized approach and industry insights helped me find the perfect role.',
    image: 'https://randomuser.me/api/portraits/women/56.jpg'
  },
  {
    name: 'Karan Malhotra',
    role: 'Cybersecurity Analyst',
    company: 'HCL',
    package: '₹16 LPA',
    quote: 'The TPO department\'s expertise in emerging technologies helped me secure a role.',
    image: 'https://randomuser.me/api/portraits/men/89.jpg'
  }
];

export default function WhyUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 6000); // Increased to 6 seconds for smoother experience
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Manual navigation with improved timing
  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setCurrentSlide(index);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 4000);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  return (
    <div className="font-poppins bg-gradient-to-br from-[#f3e8ff] via-[#e0e7ff] to-[#f8fafc] min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 bg-gradient-to-r from-navy to-accent text-white text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-4 sm:left-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className={`max-w-3xl mx-auto relative z-10 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex mt-4 items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full mb-6 animate-bounce">
            <span className="text-2xl sm:text-3xl">⭐</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg animate-bounce-in leading-tight">
            Why Choose Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 font-medium drop-shadow animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Empowering students with skills, confidence, and opportunities for a successful career launch.
          </p>
          
          {/* Decorative Elements */}
          <div className="flex justify-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className={`max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up -mt-8 sm:mt-1 z-20 relative ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.6s'}}>
        {stats.map((stat, idx) => (
          <div 
            key={stat.label} 
            className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col items-center py-6 sm:py-8 px-2 border-t-4 border-accent hover-lift hover-glow transition-all duration-300 animate-fade-in-up cursor-pointer group relative overflow-hidden`}
            style={{animationDelay: `${0.8 + idx * 0.1}s`}}
            onMouseEnter={() => setHoveredStat(stat.label)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            {/* Gradient Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
            
            <div className="text-xl sm:text-2xl mb-2 animate-pulse-slow group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy mb-1 animate-pulse-slow group-hover:text-blue-800 transition-colors">{stat.value}</div>
            <div className="text-accent font-semibold text-sm sm:text-lg group-hover:text-blue-600 transition-colors">{stat.label}</div>
            
            {/* Hover Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-navy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className={`max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '1s'}}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Our Core Services</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Comprehensive support system designed to maximize your career potential</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 stagger-animation">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover-lift hover-glow group animate-fade-in-up cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${(idx + 1) * 0.2}s` }}
              onMouseEnter={() => setActiveFeature(feature.title)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}></div>
              
              <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-navy mb-2 font-poppins group-hover:text-purple-700 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-700 font-poppins text-sm sm:text-base mb-4">{feature.description}</p>
              
              {/* Stats Badge */}
              <div className="bg-gradient-to-r from-accent to-navy text-white text-xs font-semibold px-3 py-1 rounded-full group-hover:scale-105 transition-transform duration-300">
                {feature.stats}
              </div>
              
              {/* Enhanced Hover effect indicator */}
              <div className="mt-4 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '1.5s'}}>
        <h2 className="text-3xl sm:text-4xl font-bold text-navy text-center mb-6 sm:mb-8 animate-fade-in-up">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 stagger-animation">
          {benefits.map((benefit, idx) => (
            <div key={benefit.title} className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 hover-lift transition-all duration-300 group cursor-pointer relative overflow-hidden">
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-navy group-hover:text-blue-800 transition-colors">{benefit.title}</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base group-hover:text-gray-800 transition-colors">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section with Infinite Slider */}
      <section className={`max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '2s'}}>
        <h2 className="text-3xl sm:text-4xl font-bold text-navy text-center mb-8">Student Success Stories</h2>
        
        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={sliderRef}
        >
          {/* Slider Track */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-1000 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${testimonials.length * 100}%`
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={testimonial.name} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:bg-white relative overflow-hidden group">
                    {/* Quote Icon */}
                    <div className="text-3xl text-navy/30 mb-4 group-hover:text-navy/40 transition-colors duration-300">"</div>
                    
                                         {/* Testimonial Text */}
                     <p className="text-gray-800 text-xs sm:text-sm mb-6 italic group-hover:text-gray-900 transition-colors duration-300 leading-relaxed font-medium line-clamp-4">
                       {testimonial.quote}
                     </p>
                    
                    {/* Enhanced Student Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-navy/30 group-hover:border-navy/50 transition-all duration-300 group-hover:scale-110 shadow-md"
                        />
                        <div>
                          <div className="font-bold text-navy text-sm group-hover:text-blue-800 transition-colors duration-300">{testimonial.name}</div>
                          <div className="text-xs text-gray-700 group-hover:text-gray-800 transition-colors duration-300 font-medium">{testimonial.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">{testimonial.package}</div>
                        <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                    
                    {/* Enhanced Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    {/* Subtle border effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-navy/20 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
           <button
             onClick={prevSlide}
             className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl hover:bg-white transition-all duration-300 hover:scale-110 z-20 border-2 border-navy/20 hover:border-navy/40"
             aria-label="Previous testimonial"
           >
             <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
             </svg>
           </button>
           
           <button
             onClick={nextSlide}
             className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl hover:bg-white transition-all duration-300 hover:scale-110 z-20 border-2 border-navy/20 hover:border-navy/40"
             aria-label="Next testimonial"
           >
             <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
             </svg>
           </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'bg-navy scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`text-center pb-12 sm:pb-16 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '2.5s'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-navy to-accent rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Career Journey?</h3>
              <p className="text-lg sm:text-xl mb-8 opacity-90">
                Join thousands of successful students who have launched their careers through our comprehensive TPO services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://tpo.getflytechnologies.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-navy font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 inline-flex items-center justify-center group hover:scale-105 hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Career Gateway Student Registration Portal
                </a>
                <button className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 