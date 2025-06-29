import React, { useState, useEffect } from 'react';
import { FaCar, FaToggleOn, FaToggleOff, FaSignOutAlt, FaBell, FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa';
import axios from 'axios';

const TransporterDashboard = ({ user, onLogout }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOnline) {
      fetchEmergencyRequests();
      const interval = setInterval(fetchEmergencyRequests, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isOnline]);

  const fetchEmergencyRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-requests');
      setEmergencyRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
  };

  const handleAcceptRequest = async (requestId) => {
    setIsLoading(true);
    try {
      await axios.post(`http://localhost:5000/accept-request/${requestId}`);
      alert('Emergency request accepted! Contact the patient immediately.');
      fetchEmergencyRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center mr-3">
              <FaCar className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AidGo Transporter</h1>
              <p className="text-sm text-gray-600">Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Online Status Toggle */}
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                onClick={handleToggleOnline}
                className={`text-2xl transition-colors ${
                  isOnline ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {isOnline ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome, {user.email?.split('@')[0] || 'Transporter'}
              </h2>
              <p className="text-gray-600">
                {isOnline 
                  ? 'You are currently online and available for emergency requests' 
                  : 'You are offline. Toggle online to receive emergency requests'
                }
              </p>
            </div>
            <div className={`w-4 h-4 rounded-full ${isOnline ? 'status-online' : 'status-offline'}`}></div>
          </div>
        </div>

        {!isOnline ? (
          /* Offline State */
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <FaToggleOff className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">You're Currently Offline</h3>
            <p className="text-gray-600 mb-6">
              Toggle the switch above to go online and start receiving emergency requests
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <FaBell className="text-blue-500 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">Instant Notifications</h4>
                <p className="text-sm text-gray-600">Get notified immediately when someone needs help</p>
              </div>
              <div className="text-center">
                <FaMapMarkerAlt className="text-blue-500 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">Location Based</h4>
                <p className="text-sm text-gray-600">Receive requests from your nearby area</p>
              </div>
              <div className="text-center">
                <FaClock className="text-blue-500 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">Flexible Schedule</h4>
                <p className="text-sm text-gray-600">Work on your own schedule and availability</p>
              </div>
            </div>
          </div>
        ) : (
          /* Online State */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                Emergency Requests ({emergencyRequests.length})
              </h3>
              <div className="bg-white rounded-lg px-3 py-1">
                <span className="text-sm text-green-600 font-medium">● Online</span>
              </div>
            </div>

            {emergencyRequests.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <FaBell className="text-gray-400 text-4xl mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">No Emergency Requests</h4>
                <p className="text-gray-600">
                  You're online and ready to help. Emergency requests will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {emergencyRequests.map((request) => (
                  <div key={request._id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                          Emergency Request
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(request.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        URGENT
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <FaMapMarkerAlt className="text-red-500 mr-2" />
                          <span className="font-medium text-gray-800">Location:</span>
                        </div>
                        <p className="text-gray-600 ml-6">{request.location}</p>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <FaPhone className="text-blue-500 mr-2" />
                          <span className="font-medium text-gray-800">Patient:</span>
                        </div>
                        <p className="text-gray-600 ml-6">{request.name}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAcceptRequest(request._id)}
                        disabled={isLoading}
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-all btn-hover disabled:opacity-50"
                      >
                        {isLoading ? 'Accepting...' : 'Accept Request'}
                      </button>
                      <button className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-all btn-hover">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Rides</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
              <FaCar className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-800">New</p>
              </div>
              <div className="text-yellow-500 text-2xl">⭐</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className={`text-lg font-semibold ${isOnline ? 'text-green-600' : 'text-gray-600'}`}>
                  {isOnline ? 'Available' : 'Offline'}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'status-online' : 'status-offline'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterDashboard;