import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../config/api';

const StudentDetails = ({ student, onInterviewUpdate, onClose }) => {
  const [interviewData, setInterviewData] = useState({
    status: student?.interview?.status || 'pending',
    scheduledDate: student?.interview?.scheduledDate ? 
      new Date(student.interview.scheduledDate).toISOString().split('T')[0] : '',
    scheduledTime: student?.interview?.scheduledTime || '',
    venue: student?.interview?.venue || '',
    notes: student?.interview?.notes || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const getDocumentIcon = (type) => {
    const icons = {
      marksheet: '📊',
      id_proof: '🆔',
      certificate: '🏆',
      other: '📎'
    };
    return icons[type] || icons.other;
  };

  const getDocumentLabel = (type) => {
    const labels = {
      marksheet: 'Marksheet',
      id_proof: 'ID Proof',
      certificate: 'Certificate',
      other: 'Other Document'
    };
    return labels[type] || labels.other;
  };

  if (!student) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">👤</div>
          <p>Select a student to view details</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setInterviewData({
      ...interviewData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await onInterviewUpdate(student._id, interviewData);
    
    if (result.success) {
      setMessage('Interview updated successfully!');
      setTimeout(() => setMessage(''), 3000);
      
      // Reset form after successful submission
      setInterviewData({
        status: 'pending',
        scheduledDate: '',
        scheduledTime: '',
        venue: '',
        notes: ''
      });
    } else {
      setMessage(`Error: ${result.error}`);
    }
    
    setLoading(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-100',
      selected: 'text-green-600 bg-green-100',
      rejected: 'text-red-600 bg-red-100'
    };
    return colors[status] || colors.pending;
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    const formData = new FormData(e.target);
    
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN.UPLOAD_DOCUMENT}/${student._id}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Document uploaded successfully!');
        setShowUploadModal(false);
        
        // Refresh the student data to show the new document
        window.location.reload(); // Simple refresh for now
      } else {
        const errorData = await response.json();
        setMessage(`Upload failed: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Upload error: ${error.message}`);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Student Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Student Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{student.name}</h4>
              <p className="text-gray-600">{student.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Roll Number:</span>
              <p className="text-gray-900">{student.roll}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Branch:</span>
              <p className="text-gray-900">{student.branch}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Year:</span>
              <p className="text-gray-900">{student.year}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Phone:</span>
              <p className="text-gray-900">{student.phone}</p>
            </div>
          </div>

          {student.why && (
            <div>
              <span className="font-medium text-gray-700">Why join TPO:</span>
              <p className="text-gray-900 mt-1">{student.why}</p>
            </div>
          )}

          <div>
            <span className="font-medium text-gray-700">Registration Date:</span>
            <p className="text-gray-900">{new Date(student.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Documents Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-700">Documents</span>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Upload Document
              </button>
            </div>
            
            {/* Resume */}
            <div className="mb-3 p-3 bg-white rounded border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-blue-600">📄 Resume</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Required</span>
                  </div>
                  <p className="text-sm text-gray-600">{student.resume?.originalName}</p>
                  <p className="text-xs text-gray-500">
                    Size: {(student.resume?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`${API_ENDPOINTS.ADMIN.RESUME}/${student.resume?.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    View
                  </a>
                  <a
                    href={`${API_ENDPOINTS.ADMIN.RESUME}/${student.resume?.filename}`}
                    download
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Documents */}
            {student.documents && student.documents.length > 0 ? (
              student.documents.map((doc, index) => (
                <div key={index} className="mb-3 p-3 bg-white rounded border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">
                          {getDocumentIcon(doc.type)} {getDocumentLabel(doc.type)}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {doc.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{doc.originalName}</p>
                      <p className="text-xs text-gray-500">
                        Size: {(doc.size / 1024 / 1024).toFixed(2)} MB • 
                        Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`${API_ENDPOINTS.ADMIN.DOCUMENT}/${doc.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        View
                      </a>
                      <a
                        href={`${API_ENDPOINTS.ADMIN.DOCUMENT}/${doc.filename}`}
                        download
                        className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">
                No additional documents uploaded
              </div>
            )}
          </div>
        </div>

        {/* Interview Management */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Interview Management</h4>
          
          {message && (
            <div className={`p-3 rounded-lg mb-4 ${
              message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interview Status
              </label>
              <select
                name="status"
                value={interviewData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending Review</option>
                <option value="selected">Selected for Interview</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {interviewData.status === 'selected' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={interviewData.scheduledDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Time
                  </label>
                  <input
                    type="time"
                    name="scheduledTime"
                    value={interviewData.scheduledTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={interviewData.venue}
                    onChange={handleInputChange}
                    placeholder="e.g., TPO Office, Room 101"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={interviewData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Add any additional notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </div>
              ) : (
                'Update Interview Status'
              )}
            </button>
          </form>

          {/* Current Status Display */}
          {student.interview && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">Current Status</h5>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(student.interview.status)}`}>
                {student.interview.status === 'pending' && 'Pending Review'}
                {student.interview.status === 'selected' && 'Selected for Interview'}
                {student.interview.status === 'rejected' && 'Rejected'}
              </div>
              
              {student.interview.scheduledDate && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Date: {new Date(student.interview.scheduledDate).toLocaleDateString()}</p>
                  {student.interview.scheduledTime && (
                    <p>Time: {student.interview.scheduledTime}</p>
                  )}
                  {student.interview.venue && (
                    <p>Venue: {student.interview.venue}</p>
                  )}
                </div>
              )}
              
              {student.interview.notifiedAt && (
                <div className="mt-2 text-xs text-gray-500">
                  Notified: {new Date(student.interview.notifiedAt).toLocaleString()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Document Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upload Document</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleDocumentUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    name="documentType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select document type</option>
                    <option value="marksheet">Marksheet</option>
                    <option value="id_proof">ID Proof</option>
                    <option value="certificate">Certificate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select File
                  </label>
                  <input
                    type="file"
                    name="document"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF (Max 50MB)
                  </p>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadLoading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {uploadLoading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
