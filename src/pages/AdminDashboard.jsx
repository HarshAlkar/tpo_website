import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentList from '../components/admin/StudentList';
import InterviewStats from '../components/admin/InterviewStats';
import StudentDetails from '../components/admin/StudentDetails';
import { API_ENDPOINTS } from '../config/api';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin/login');
      return;
    }
    
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch students and stats in parallel
      const [studentsResponse, statsResponse] = await Promise.all([
        fetch(API_ENDPOINTS.ADMIN.DASHBOARD),
        fetch(API_ENDPOINTS.ADMIN.INTERVIEW_STATS)
      ]);

      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json();
        setStudents(studentsData.data || []);
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data || {});
      }
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleInterviewUpdate = async (studentId, interviewData) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN.UPDATE_INTERVIEW}/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update local state immediately for better UX
        setStudents(prevStudents => 
          prevStudents.map(student => 
            student._id === studentId 
              ? { ...student, interview: result.data.interview }
              : student
          )
        );
        
        // Update stats immediately
        const updatedStats = { ...stats };
        const oldStatus = students.find(s => s._id === studentId)?.interview?.status || 'pending';
        const newStatus = interviewData.status;
        
        if (oldStatus !== newStatus) {
          updatedStats[oldStatus] = Math.max(0, (updatedStats[oldStatus] || 0) - 1);
          updatedStats[newStatus] = (updatedStats[newStatus] || 0) + 1;
          setStats(updatedStats);
        }
        
        // Update selected student if it's the same one
        if (selectedStudent && selectedStudent._id === studentId) {
          setSelectedStudent({ ...selectedStudent, interview: result.data.interview });
        }
        
        return { success: true, message: result.message };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update interview');
      }
    } catch (err) {
      console.error('Interview update error:', err);
      return { success: false, error: err.message };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Separate students by status
  const pendingStudents = students.filter(s => !s.interview?.status || s.interview?.status === 'pending');
  const selectedStudents = students.filter(s => s.interview?.status === 'selected');
  const rejectedStudents = students.filter(s => s.interview?.status === 'rejected');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Logo */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-20"></div>
            </div>
            
            <div className="relative z-10 text-center">
              {/* Logo and Title Section */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="/src/assets/TPO_logo.svg" 
                      alt="TPO Logo" 
                      className="w-10 h-10 text-white"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <svg className="w-10 h-10 text-white hidden" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 tracking-tight">
                      TPO Admin
                    </h1>
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Dashboard
                    </div>
                  </div>
                </div>
              </div>
              
              {/* College Info */}
              <div className="space-y-2">
                <p className="text-xl font-semibold text-gray-700">Vasantdada Patil Pratishthan's College of Engineering</p>
                <p className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-gray-200">
                  🎓 Manage student registrations and interview processes
                </p>
              </div>
              
              {/* Decorative Elements */}
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <InterviewStats stats={stats} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* All Students List - Full Width */}
          <div className="xl:col-span-2">
            <StudentList 
              students={students} 
              onStudentSelect={setSelectedStudent}
              onRefresh={fetchData}
            />
          </div>

          {/* Student Details Panel */}
          <div className="xl:col-span-1">
            {selectedStudent ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Student Details
                  </h2>
                  <p className="text-emerald-100 mt-1">Manage individual student information</p>
                </div>
                <div className="p-6">
                  <StudentDetails 
                    student={selectedStudent} 
                    onInterviewUpdate={handleInterviewUpdate}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Student Selected</h3>
                  <p className="text-gray-500 mb-4">Choose a student from the list to view their details and manage their application</p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      💡 <strong>Tip:</strong> Click on any student card to view their profile, documents, and interview status
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{pendingStudents.length}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{selectedStudents.length}</div>
              <div className="text-sm text-gray-600">Selected</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600">{rejectedStudents.length}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600">{students.length}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
