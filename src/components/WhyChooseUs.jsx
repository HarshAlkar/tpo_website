// To enable animations, install AOS: npm install aos
// Import 'aos/dist/aos.css' in your main.jsx or App.jsx
// Initialize AOS in useEffect: import AOS from 'aos'; useEffect(() => { AOS.init({ once: true }); }, []);
import React, { useState, useEffect, useRef } from 'react';
import { BriefcaseIcon, AcademicCapIcon, UserGroupIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, CheckBadgeIcon, ClockIcon, StarIcon, TrophyIcon, HeartIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import asmitaImg from '../assets/TESTMONIAL/ASMITA.jpeg';
import purvaImg from '../assets/TESTMONIAL/Purva.jpeg';  
import eshwariImg from '../assets/TESTMONIAL/Eshwari.jpeg';
import pranavImg from '../assets/TESTMONIAL/pravna.jpeg';
import akashImg from '../assets/TESTMONIAL/akash.jpeg';

const features = [
  {
    title: 'Industry Partnerships',
    description: 'Trusted collaborations with leading companies for internships and placements.',
    icon: BriefcaseIcon,
    iconBg: 'bg-gradient-to-br from-navy to-blue-800',
    accent: 'from-navy to-blue-800',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    title: 'Expert Training Programs',
    description: 'Get industry-ready with aptitude, coding, and soft-skill workshops.',
    icon: AcademicCapIcon,
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
    accent: 'from-gray-400 to-gray-600',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    title: 'Dedicated Placement Team',
    description: 'TPO staff and student co-ordinators ensuring smooth placement drives.',
    icon: UserGroupIcon,
    iconBg: 'bg-gradient-to-br from-navy to-blue-800',
    accent: 'from-navy to-blue-800',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Resume & Interview Prep',
    description: 'Personalized support for CV building and mock interview practice.',
    icon: DocumentTextIcon,
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
    accent: 'from-gray-400 to-gray-600',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Regular Seminars & Talks',
    description: 'Connect with industry experts through guest sessions and webinars.',
    icon: ChatBubbleLeftRightIcon,
    iconBg: 'bg-gradient-to-br from-navy to-blue-800',
    accent: 'from-navy to-blue-800',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    title: 'Proven Placement Record',
    description: 'Our alumni are placed in top MNCs and startups across India.',
    icon: CheckBadgeIcon,
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
    accent: 'from-gray-400 to-gray-600',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    title: '24/7 Career Support',
    description: 'Round-the-clock assistance for career guidance and placement queries.',
    icon: ClockIcon,
    iconBg: 'bg-gradient-to-br from-navy to-blue-800',
    accent: 'from-navy to-blue-800',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Premium Company Network',
    description: 'Access to Fortune 500 companies and emerging startups worldwide.',
    icon: StarIcon,
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
    accent: 'from-gray-400 to-gray-600',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    title: 'Award-Winning Excellence',
    description: 'Recognized for outstanding placement performance and student success.',
    icon: TrophyIcon,
    iconBg: 'bg-gradient-to-br from-navy to-blue-800',
    accent: 'from-navy to-blue-800',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    title: 'Student-Centric Approach',
    description: 'Personalized attention and customized career development plans.',
    icon: HeartIcon,
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
    accent: 'from-gray-400 to-gray-600',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous quality checks ensuring only the best opportunities.',
    icon: ShieldCheckIcon,
    iconBg: 'bg-gradient-to-br from-navy to-blue-800',
    accent: 'from-navy to-blue-800',
    gradient: 'from-slate-500 to-gray-600',
  },
  {
    title: 'Innovation & Technology',
    description: 'Cutting-edge tools and platforms for modern career development.',
    icon: SparklesIcon,
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
    accent: 'from-gray-400 to-gray-600',
    gradient: 'from-violet-500 to-purple-600',
  },
];

const testimonials = [
  {
    name: 'Asmita Ghode',
    role: 'Sr. Executive at Godrej Infotech Ltd',
    year: '2025 Batch',
    quote: 'The TPO department helped me secure my dream job at Microsoft. Their guidance throughout the placement process was invaluable.',
    image: asmitaImg,
    company: 'Godrej Infotech Ltd',
    package: '₹4 LPA'
  },
  {
    name: 'Purva Nagap',
    role: 'SDT - Technology & Development ',
    year: '2025 Batch',
    quote: 'The training programs and mock interviews prepared me perfectly for the industry. I\'m grateful for the TPO team\'s support.',
    image: purvaImg,
    company: 'Kytes',
    package: '₹12.5 LPA'
  },
  {
    name: 'Eshwari Rampoore',
    role: 'Associate Software Engineer',
    year: '2025 Batch',
    quote: 'From resume building to final placement, the TPO department was with me every step of the way. Highly recommended!',
    image: eshwariImg,
    company: 'NiCE',
    package: '₹8 LPA'
  },
  {
    name: 'Pranav Yamageka',
    role: 'Full Stack Developer at Infosys',
    year: '2024 Batch',
    quote: 'The TPO team\'s dedication to student success is unmatched. They helped me land a great role at Infosys.',
    image: pranavImg,
    company: 'ICIC',
    package: '₹5 LPA'
  },
  {
    name: 'Akash Nahak',
    role: 'DevOps Engineer at TCS',
    year: '2022 Batch',
    quote: 'Excellent career guidance and placement support. The TPO department truly cares about student success.',
    image: 'akashImg',
    company: 'Wissen',
    package: '₹6.5 LPA'
  },
  {
    name: 'Arjun Mehta',
    role: 'Machine Learning Engineer at Wipro',
    year: '2023 Batch',
    quote: 'The skill development programs and industry connections provided by TPO were crucial for my career growth.',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
    company: 'Wipro',
    package: '₹15 LPA'
  },
  {
    name: 'Sneha Reddy',
    role: 'UI/UX Designer at Cognizant',
    year: '2022 Batch',
    quote: 'TPO\'s personalized approach and industry insights helped me find the perfect role in design.',
    image: 'https://randomuser.me/api/portraits/women/56.jpg',
    company: 'Cognizant',
    package: '₹14 LPA'
  },
  {
    name: 'Karan Malhotra',
    role: 'Cybersecurity Analyst at HCL',
    year: '2023 Batch',
    quote: 'The TPO department\'s expertise in emerging technologies helped me secure a role in cybersecurity.',
    image: 'https://randomuser.me/api/portraits/men/89.jpg',
    company: 'HCL',
    package: '₹16 LPA'
  }
];

const achievements = [
  { number: '95%', label: 'Placement Rate', description: 'Consistent high placement success rate', icon: '🎯', color: 'from-green-500 to-emerald-600' },
  { number: '180+', label: 'Companies', description: 'Active partnerships with top firms', icon: '🏢', color: 'from-blue-500 to-indigo-600' },
  { number: '₹32.57 LPA', label: 'Highest Package', description: 'Record-breaking salary offers', icon: '💰', color: 'from-yellow-500 to-orange-600' },
  { number: '804+', label: 'Students Placed', description: 'Successful career launches', icon: '👥', color: 'from-purple-500 to-pink-600' }
];

export default function WhyChooseUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000); // Increased to 5 seconds for smoother experience
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
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-navy/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/30 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-navy/10 to-blue-600/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-navy to-blue-800 rounded-full mb-6 shadow-lg animate-bounce">
            <AcademicCapIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-navy mb-6 leading-tight">
            Why Choose Our
            <span className="block bg-gradient-to-r from-navy to-blue-800 bg-clip-text text-transparent animate-pulse">
              TPO Department
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-navy to-blue-600 mx-auto mb-8 rounded-full animate-pulse"></div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            We empower students with the tools, training, and connections to shape their career journey with excellence and precision.
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-8 sm:mb-12">
            Comprehensive Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:bg-white/95 hover:border-navy/20 cursor-pointer"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                {/* Enhanced Icon Container */}
                <div className={`relative mb-6 flex items-center justify-center rounded-2xl w-16 h-16 sm:w-20 sm:h-20 ${feature.iconBg} shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white group-hover:animate-pulse" />
                  
                  {/* Enhanced Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                </div>

                {/* Enhanced Feature Content */}
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-navy group-hover:text-blue-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <div className="w-12 h-0.5 bg-gradient-to-r from-navy to-blue-600 rounded-full group-hover:w-16 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-light group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Enhanced Hover Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-navy/20 group-hover:to-blue-600/20 transition-all duration-500 pointer-events-none"></div>

                {/* Enhanced Background Pattern */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="w-full h-full border-2 border-navy rounded-full"></div>
                </div>

                {/* New: Gradient Overlay on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Key Achievements Section */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-8 sm:mb-12">
            Our Achievements
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {achievements.map((achievement, idx) => (
              <div key={achievement.label} className="text-center group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  {/* Achievement Icon */}
                  <div className="text-4xl mb-4 animate-bounce" style={{animationDelay: `${idx * 0.2}s`}}>
                    {achievement.icon}
                  </div>
                  
                  <div className="text-3xl sm:text-4xl font-bold text-navy mb-2 group-hover:text-blue-800 transition-colors">
                    {achievement.number}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                    {achievement.label}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    {achievement.description}
                  </div>
                  
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Student Testimonials Section with Infinite Slider */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-8 sm:mb-12">
            What Our Students Say
          </h3>
          
          {/* Slider Container */}
          <div 
            className="relative max-w-4xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={sliderRef}
          >
            {/* Slider Track */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-1000 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  width: `${testimonials.length * 100}%`
                }}
              >
                {testimonials.map((testimonial, idx) => (
                  <div key={testimonial.name} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:bg-white/95 relative overflow-hidden group">
                      {/* Quote Icon */}
                      <div className="text-3xl text-navy/20 mb-4 group-hover:text-navy/30 transition-colors duration-300">"</div>
                      
                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-sm sm:text-base mb-6 italic group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                        {testimonial.quote}
                      </p>
                      
                      {/* Enhanced Student Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-navy/20 group-hover:border-navy/40 transition-all duration-300 group-hover:scale-110"
                          />
                          <div>
                            <div className="font-semibold text-navy text-sm group-hover:text-blue-800 transition-colors duration-300">{testimonial.name}</div>
                            <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{testimonial.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-semibold text-green-600 group-hover:text-green-700 transition-colors duration-300">{testimonial.package}</div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{testimonial.company}</div>
                        </div>
                      </div>
                      
                      {/* Enhanced Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                      
                      {/* Subtle border effect */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-navy/10 transition-all duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        </div>

        {/* Enhanced Additional Information Section */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-8 sm:mb-12">
            Our Commitment to Excellence
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <h4 className="text-xl sm:text-2xl font-bold text-navy mb-4 group-hover:text-blue-800 transition-colors">Personalized Career Guidance</h4>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                Our experienced team provides one-on-one career counseling, helping students identify their strengths, 
                explore career options, and develop personalized career plans that align with their goals and aspirations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2 group-hover:text-gray-700 transition-colors">
                  <div className="w-2 h-2 bg-navy rounded-full group-hover:scale-125 transition-transform"></div>
                  <span>Individual career assessment sessions</span>
                </li>
                <li className="flex items-center space-x-2 group-hover:text-gray-700 transition-colors">
                  <div className="w-2 h-2 bg-navy rounded-full group-hover:scale-125 transition-transform"></div>
                  <span>Customized skill development plans</span>
                </li>
                <li className="flex items-center space-x-2 group-hover:text-gray-700 transition-colors">
                  <div className="w-2 h-2 bg-navy rounded-full group-hover:scale-125 transition-transform"></div>
                  <span>Industry-specific guidance and mentoring</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <h4 className="text-xl sm:text-2xl font-bold text-navy mb-4 group-hover:text-blue-800 transition-colors">Comprehensive Training Programs</h4>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                We offer a wide range of training programs designed to enhance students' technical skills, 
                soft skills, and industry readiness for successful career placement.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2 group-hover:text-gray-700 transition-colors">
                  <div className="w-2 h-2 bg-navy rounded-full group-hover:scale-125 transition-transform"></div>
                  <span>Technical skill enhancement workshops</span>
                </li>
                <li className="flex items-center space-x-2 group-hover:text-gray-700 transition-colors">
                  <div className="w-2 h-2 bg-navy rounded-full group-hover:scale-125 transition-transform"></div>
                  <span>Communication and leadership training</span>
                </li>
                <li className="flex items-center space-x-2 group-hover:text-gray-700 transition-colors">
                  <div className="w-2 h-2 bg-navy rounded-full group-hover:scale-125 transition-transform"></div>
                  <span>Mock interviews and assessment centers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Call-to-Action */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gray-100 mb-8 animate-pulse">
            <div className="w-2 h-2 bg-gradient-to-r from-navy to-blue-600 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium">Excellence in Every Placement</span>
            <div className="w-2 h-2 bg-gradient-to-r from-navy to-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          <div className="bg-gradient-to-r from-navy to-blue-800 rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Career Journey?</h3>
              <p className="text-lg sm:text-xl mb-6 opacity-90">
                Join thousands of successful students who have launched their careers through our comprehensive TPO services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://tpo.getflytechnologies.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-navy font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center group hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Career Gateway Student Registration Portal
                </a>
                <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 