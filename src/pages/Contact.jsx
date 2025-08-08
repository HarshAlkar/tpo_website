import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS } from '../config/api';
import swapnilImg from '../assets/SWPNIL.jpg';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Required';
    if (!form.email) errs.email = 'Required';
    if (!form.message) errs.message = 'Required';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.CONTACT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (data.success) {
          setSubmitted(true);
          setEmailStatus({
            adminEmail: data.emailSent,
            senderEmail: data.senderEmailSent
          });
          setForm({ name: '', email: '', message: '' });
        } else {
          alert('Message failed to send: ' + data.message);
        }
      } catch (error) {
        console.error('Contact error:', error);
        alert('Message failed to send. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="font-poppins bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 animate-fade-in-up">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Get in touch with our Training & Placement Department for any queries, career guidance, or placement opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className={`bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy mb-4 sm:mb-6 font-poppins text-center">
              Send us a Message
            </h2>
            {submitted ? (
              <div className="text-center animate-bounce-in">
                <div className="text-green-600 font-poppins text-lg mb-4">Thank you for contacting us!</div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">We'll get back to you soon!</p>
                
                {/* Email Status */}
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Email Notifications:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${emailStatus.adminEmail ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>Admin notification: {emailStatus.adminEmail ? 'Sent' : 'Failed'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${emailStatus.senderEmail ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>Sender confirmation: {emailStatus.senderEmail ? 'Sent' : 'Failed'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-5 stagger-animation" onSubmit={handleSubmit}>
                <div className="animate-fade-in-up">
                  <label className="block font-poppins mb-2 text-base font-medium">Name *</label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base" 
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="text-red-500 text-sm animate-fade-in">{errors.name}</span>}
                </div>
                <div className="animate-fade-in-up">
                  <label className="block font-poppins mb-2 text-base font-medium">Email *</label>
                  <input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base" 
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className="text-red-500 text-sm animate-fade-in">{errors.email}</span>}
                </div>
                <div className="animate-fade-in-up">
                  <label className="block font-poppins mb-2 text-base font-medium">Message *</label>
                  <textarea 
                    name="message" 
                    value={form.message} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base" 
                    rows="5"
                    placeholder="Tell us about your query or requirement"
                  />
                  {errors.message && <span className="text-red-500 text-sm animate-fade-in">{errors.message}</span>}
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg font-poppins transition-all hover-lift hover-glow animate-fade-in-up group text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Placement Contact Card */}
            <div className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="text-center mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden mx-auto mb-6 shadow-xl border-4 border-blue-100 hover-lift transition-all duration-300">
                  <img 
                    src={swapnilImg} 
                    alt="Dr. Swapnil Rajendra Desai" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Placements Connect</h3>
                <h4 className="text-lg font-semibold text-blue-600 mb-1">Dr. Swapnil Rajendra Desai</h4>
                <p className="text-gray-600 text-sm mb-4">Ph.D, M.Tech (CSE), PG-DAC, BE (CSE)</p>
                <p className="text-blue-600 font-semibold">Training & Placement Officer</p>
              </div>

              <div className="space-y-4">
                {/* Phone Numbers */}
                <div className="flex items-center gap-3 hover-lift p-3 rounded-lg transition-all duration-300 bg-gray-50">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Phone Numbers</p>
                    <p className="text-gray-600 text-sm">+91 8087039494</p>
                    <p className="text-gray-600 text-sm">+91 9890666093</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 hover-lift p-3 rounded-lg transition-all duration-300 bg-gray-50">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600 text-sm">tpo@pvppcoe.ac.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* College Address Card */}
            <div className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.6s'}}>
              <h3 className="text-xl font-bold text-navy mb-4">College Address</h3>
              <div className="flex items-start gap-3 hover-lift p-3 rounded-lg transition-all duration-300 bg-gray-50">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Vasantdada Patil Pratishthan's College of Engineering and Visual Arts</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Vasantdada Patil Educational Complex,<br />
                    Off Eastern Express Highway,<br />
                    Padmabhushan Vasantdada Patil Marg,<br />
                    Near Everard Nagar, Sion (East),<br />
                    Mumbai 400022.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.9s'}}>
              <h3 className="text-xl font-bold text-navy mb-4">Quick Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">Office Hours</p>
                  <p className="text-gray-600 text-xs">Mon - Fri: 9:00 AM - 5:00 PM</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">Response Time</p>
                  <p className="text-gray-600 text-xs">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 