import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const years = ['First Year', 'Second Year', 'Third Year', 'Final Year'];
const branches = ['Computer Engineering', 'Information Technology', 'Artificial Intelligence & Machine Learning (AI&ML)', 'Electronics & Computer Science Engineering (ECS)', 'Mechatronics'];

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    roll: '',
    branch: '',
    year: '',
    phone: '',
    email: '',
    why: '',
  });
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
    if (!form.roll) errs.roll = 'Required';
    if (!form.branch) errs.branch = 'Required';
    if (!form.year) errs.year = 'Required';
    if (!form.phone) errs.phone = 'Required';
    if (!form.email) errs.email = 'Required';
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
        const response = await fetch('http://localhost:5000/api/register', {
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
            studentEmail: data.studentEmailSent
          });
          setForm({
            name: '',
            roll: '',
            branch: '',
            year: '',
            phone: '',
            email: '',
            why: '',
          });
        } else {
          alert('Registration failed: ' + data.message);
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
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
            Student Registration
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Join our Training & Placement Department to access career opportunities, internships, and professional development programs.
          </p>
        </div>

        {/* Centered Registration Form */}
        <div className="max-w-2xl mx-auto">
          <div className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-6 font-poppins text-center">
              Registration Form
            </h2>
            {submitted ? (
              <div className="text-center animate-bounce-in">
                <div className="text-green-600 font-poppins text-lg mb-4">Registration Successful!</div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">Welcome to the TPO Department!</p>
                
                {/* Email Status */}
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Email Notifications:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${emailStatus.adminEmail ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>Admin notification: {emailStatus.adminEmail ? 'Sent' : 'Failed'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${emailStatus.studentEmail ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>Student confirmation: {emailStatus.studentEmail ? 'Sent' : 'Failed'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-5 stagger-animation" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="animate-fade-in-up">
                    <label className="block font-poppins mb-2 text-base font-medium">Full Name *</label>
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
                    <label className="block font-poppins mb-2 text-base font-medium">Roll Number *</label>
                    <input 
                      name="roll" 
                      value={form.roll} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base" 
                      placeholder="Enter roll number"
                    />
                    {errors.roll && <span className="text-red-500 text-sm animate-fade-in">{errors.roll}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="animate-fade-in-up">
                    <label className="block font-poppins mb-2 text-base font-medium">Branch *</label>
                    <select 
                      name="branch" 
                      value={form.branch} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base"
                    >
                      <option value="">Select Branch</option>
                      {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                    </select>
                    {errors.branch && <span className="text-red-500 text-sm animate-fade-in">{errors.branch}</span>}
                  </div>
                  <div className="animate-fade-in-up">
                    <label className="block font-poppins mb-2 text-base font-medium">Year *</label>
                    <select 
                      name="year" 
                      value={form.year} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base"
                    >
                      <option value="">Select Year</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    {errors.year && <span className="text-red-500 text-sm animate-fade-in">{errors.year}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="animate-fade-in-up">
                    <label className="block font-poppins mb-2 text-base font-medium">Phone Number *</label>
                    <input 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base" 
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <span className="text-red-500 text-sm animate-fade-in">{errors.phone}</span>}
                  </div>
                  <div className="animate-fade-in-up">
                    <label className="block font-poppins mb-2 text-base font-medium">Email ID *</label>
                    <input 
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base" 
                      placeholder="Enter email address"
                    />
                    {errors.email && <span className="text-red-500 text-sm animate-fade-in">{errors.email}</span>}
                  </div>
                </div>

                <div className="animate-fade-in-up">
                  <label className="block font-poppins mb-2 text-base font-medium">Why do you want to join TPO? (Optional)</label>
                  <textarea 
                    name="why" 
                    value={form.why} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover-lift text-base" 
                    rows="4"
                    placeholder="Tell us about your interest in joining the TPO department..."
                  />
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
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Registration
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.3s'}}>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-6 text-center">Benefits of Joining TPO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">Career Guidance</h4>
                    <p className="text-gray-600 text-sm">Professional career counseling and personalized guidance to help you make informed decisions about your future.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">Placement Opportunities</h4>
                    <p className="text-gray-600 text-sm">Access to top companies and exclusive job opportunities with competitive salary packages.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">Internship Programs</h4>
                    <p className="text-gray-600 text-sm">Summer and winter internship opportunities with leading companies to gain practical experience.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">Skill Development</h4>
                    <p className="text-gray-600 text-sm">Training programs, workshops, and skill development sessions to enhance your employability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">Networking</h4>
                    <p className="text-gray-600 text-sm">Connect with industry professionals, alumni, and fellow students to build your professional network.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover-lift transition-all duration-300">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">Resume Building</h4>
                    <p className="text-gray-600 text-sm">Professional resume writing assistance and interview preparation to boost your confidence.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-xl font-bold text-navy mb-6 text-center">Our Success Numbers</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">804+</div>
                  <div className="text-sm text-gray-600">Students Placed</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">180+</div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">32.57</div>
                  <div className="text-sm text-gray-600">LPA Highest</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">739+</div>
                  <div className="text-sm text-gray-600">Internships</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
