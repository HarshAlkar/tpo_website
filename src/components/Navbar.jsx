import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/TPO_logo.svg';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Why Choose Us', href: '/why-us' },
  { name: 'Events', href: '/events' },
  // { name: 'Committee', href: '/committee' },
  { name: 'Register', href: '/register' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false); // Close menu on route change
  }, [location]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100 ${scrolled ? 'shadow-lg' : ''} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3 hover-scale">
          <img src={logo} alt="PVPP COE TPO Logo" className="h-9 w-9 sm:h-11 sm:w-11  object-contain border-none bg-transparent animate-bounce-in" />
          <div className="font-bold text-navy text-lg sm:text-xl font-poppins tracking-wide animate-fade-in">
            <span className="hidden sm:inline">TPO Department</span>
            <span className="sm:hidden">TPO</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 xl:gap-8">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-navy font-medium hover:text-accent transition-all duration-300 font-poppins relative group animate-fade-in-up text-sm xl:text-base`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden flex flex-col gap-1 hover-scale p-2" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md px-4 pb-6 pt-2 flex flex-col gap-4 shadow-lg animate-fade-in-down border-t border-gray-100">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-navy font-medium hover:text-accent transition-all duration-300 font-poppins text-lg hover-lift py-2 px-3 rounded-lg hover:bg-gray-50" 
              onClick={() => setOpen(false)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
} 