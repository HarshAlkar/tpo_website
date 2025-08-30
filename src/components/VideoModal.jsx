import React, { useState, useRef, useEffect } from 'react';

const VideoModal = ({ isOpen, onClose, videoSrc, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 mt-20 bg-white rounded-2xl shadow-2xl overflow-hidden" style={{position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)'}}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <h3 className="text-lg font-semibold truncate">{title || 'Registration Video'}</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[70vh]"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Click outside or press ESC to close
          </div>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
