import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaLock, FaAmbulance } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
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

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        email: formData.email,
        phone: formData.phone,
        loginMethod: loginMethod
      };
      
      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="bg-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaAmbulance className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AidGo</h1>
          <p className="text-gray-600">Emergency Transport at Your Fingertips</p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginMethod === 'email'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <FaEnvelope className="inline mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginMethod === 'phone'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <FaPhone className="inline mr-2" />
            Phone
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="spinner mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;