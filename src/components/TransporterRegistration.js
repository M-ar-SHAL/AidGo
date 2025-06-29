import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCar, FaIdCard, FaPhone, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const TransporterRegistration = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    vehicleType: '',
    vehicleModel: '',
    plateNumber: '',
    licenseNumber: '',
    emergencyContact: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const registrationData = {
        ...formData,
        userId: user.id,
        email: user.email,
        role: 'transporter',
        status: 'pending_verification',
        registrationDate: new Date().toISOString()
      };

      const response = await axios.post('http://localhost:5000/register', registrationData);
      
      // Simulate processing time
      setTimeout(() => {
        alert('Registration submitted successfully! You will be notified once verified.');
        navigate('/transporter-dashboard');
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800">Transporter Registration</h1>
          <div></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 fade-in">
          <div className="text-center mb-8">
            <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaCar className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Our Transport Network</h2>
            <p className="text-gray-600">Help save lives by providing emergency transportation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaUser className="mr-2 text-blue-500" />
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus resize-none"
                  rows="3"
                  placeholder="Enter your complete address"
                  required
                />
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaCar className="mr-2 text-blue-500" />
                Vehicle Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="2-wheeler">2-Wheeler (Motorcycle/Scooter)</option>
                    <option value="3-wheeler">3-Wheeler (Auto-rickshaw)</option>
                    <option value="4-wheeler">4-Wheeler (Car/SUV)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Model *
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                    placeholder="e.g., Honda Activa, Maruti Swift"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plate Number *
                  </label>
                  <input
                    type="text"
                    name="plateNumber"
                    value={formData.plateNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                    placeholder="e.g., AB-123-CD"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number *
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                    placeholder="Enter your driving license number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaPhone className="mr-2 text-blue-500" />
                Emergency Contact
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Number *
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                  placeholder="Enter emergency contact number"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Important Notes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your registration will be verified before activation</li>
                <li>• You must have a valid driving license</li>
                <li>• Vehicle insurance is mandatory</li>
                <li>• You can change your availability status anytime</li>
                <li>• Emergency requests are time-sensitive</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-all btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  Submitting Registration...
                </div>
              ) : (
                'Submit Registration'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransporterRegistration;