import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaSpinner, FaCheckCircle, FaArrowLeft, FaClock } from 'react-icons/fa';
import axios from 'axios';

const EmergencyRequest = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('location'); // location, requesting, waiting, matched
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchedTransporter, setMatchedTransporter] = useState(null);
  const [requestTime, setRequestTime] = useState(null);

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setStep('requesting');
    setIsLoading(true);
    setRequestTime(new Date());

    try {
      // Send emergency request to backend
      const response = await axios.post('http://localhost:5000/request-help', {
        patientId: user.id,
        name: user.email?.split('@')[0] || 'Patient',
        location: location,
        timestamp: new Date().toISOString(),
        status: 'pending'
      });

      setStep('waiting');
      
      // Simulate finding a transporter (in real app, this would be real-time)
      setTimeout(() => {
        setMatchedTransporter({
          name: 'John Doe',
          vehicle: '2-Wheeler',
          plateNumber: 'AB-123-CD',
          phone: '+1-234-567-8900',
          eta: '5-7 minutes',
          rating: 4.8
        });
        setStep('matched');
        setIsLoading(false);
      }, 3000);

    } catch (error) {
      console.error('Error sending emergency request:', error);
      setIsLoading(false);
    }
  };

  const formatElapsedTime = () => {
    if (!requestTime) return '0:00';
    const now = new Date();
    const diff = Math.floor((now - requestTime) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;
    if (requestTime && step === 'waiting') {
      interval = setInterval(() => {
        // Force re-render to update elapsed time
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [requestTime, step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/patient-dashboard')}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-xl font-bold text-gray-800">Emergency Request</h1>
          <div></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Location Input Step */}
        {step === 'location' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 fade-in">
            <div className="text-center mb-6">
              <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Location</h2>
              <p className="text-gray-600">Please provide your current address for emergency pickup</p>
            </div>

            <form onSubmit={handleLocationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Address *
                </label>
                <textarea
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent input-focus resize-none"
                  rows="3"
                  placeholder="Enter your complete address with landmarks..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-all btn-hover"
              >
                Send Emergency Request
              </button>
            </form>
          </div>
        )}

        {/* Requesting Step */}
        {step === 'requesting' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center fade-in">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sending Emergency Request</h2>
            <p className="text-gray-600">Please wait while we process your request...</p>
          </div>
        )}

        {/* Waiting Step */}
        {step === 'waiting' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center fade-in">
            <div className="pulse-animation">
              <FaSpinner className="text-red-500 text-4xl mx-auto mb-6 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Finding Nearby Transporters</h2>
            <p className="text-gray-600 mb-4">We're notifying available transporters in your area...</p>
            
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center text-red-600">
                <FaClock className="mr-2" />
                <span className="font-medium">Elapsed Time: {formatElapsedTime()}</span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>• Your location: {location}</p>
              <p>• Request sent to nearby transporters</p>
              <p>• Average response time: 2-5 minutes</p>
            </div>
          </div>
        )}

        {/* Matched Step */}
        {step === 'matched' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 fade-in">
            <div className="text-center mb-6">
              <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Transporter Found!</h2>
              <p className="text-gray-600">A transporter has accepted your emergency request</p>
            </div>

            {matchedTransporter && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Transporter Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-medium">{matchedTransporter.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Vehicle:</span>
                      <p className="font-medium">{matchedTransporter.vehicle}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Plate Number:</span>
                      <p className="font-medium">{matchedTransporter.plateNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">ETA:</span>
                      <p className="font-medium text-green-600">{matchedTransporter.eta}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
                  <p className="text-blue-600 font-medium">{matchedTransporter.phone}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    You can call the transporter directly for coordination
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Important Instructions</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Stay at your current location: {location}</li>
                    <li>• Keep your phone accessible</li>
                    <li>• Look for vehicle: {matchedTransporter.plateNumber}</li>
                    <li>• Have any medical information ready</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyRequest;