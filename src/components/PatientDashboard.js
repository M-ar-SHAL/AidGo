import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAmbulance, FaMapMarkerAlt, FaPhone, FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';

const PatientDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleEmergencyRequest = () => {
    navigate('/emergency-request');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center mr-3">
              <FaAmbulance className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AidGo</h1>
              <p className="text-sm text-gray-600">Emergency Dashboard</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome, {user.email?.split('@')[0] || 'User'}
          </h2>
          <p className="text-red-100">
            In case of emergency, tap the button below for immediate assistance
          </p>
        </div>

        {/* Emergency Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleEmergencyRequest}
            className="bg-white text-red-600 rounded-full w-64 h-64 flex flex-col items-center justify-center shadow-2xl hover:shadow-3xl transition-all emergency-pulse btn-hover emergency-btn"
          >
            <FaExclamationTriangle className="text-6xl mb-4" />
            <span className="text-2xl font-bold">EMERGENCY</span>
            <span className="text-lg">Tap for Help</span>
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-red-500 text-2xl mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Quick Location</h3>
            </div>
            <p className="text-gray-600">
              Your location will be automatically shared with nearby transporters for faster response.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
            <div className="flex items-center mb-4">
              <FaPhone className="text-red-500 text-2xl mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Direct Contact</h3>
            </div>
            <p className="text-gray-600">
              Once a transporter accepts your request, you'll receive their contact information.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
            <div className="flex items-center mb-4">
              <FaAmbulance className="text-red-500 text-2xl mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Fast Response</h3>
            </div>
            <p className="text-gray-600">
              Our network of verified transporters ensures quick response times in emergencies.
            </p>
          </div>
        </div>

        {/* Emergency Tips */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Tips</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Stay calm and provide accurate location information
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Keep your phone charged and accessible
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Have important medical information ready if applicable
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Wait in a safe, visible location for your transporter
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;