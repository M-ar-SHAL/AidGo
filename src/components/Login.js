import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaLock, FaAmbulance, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      setIsLoading(false);
      return;
    }

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      {/* App Name - Centered at Top */}
      <div className="text-center mb-12">
        <div className="bg-blue-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FaAmbulance className="text-white text-3xl" />
        </div>
        <h1 className="text-6xl font-bold text-blue-600 mb-2 tracking-wide">AidGo</h1>
        <p className="text-xl text-gray-600 font-medium">Emergency Transport at Your Fingertips</p>
      </div>

      {/* Login/Signup Card */}
      <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-yellow-300">
        {/* Card Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isSignUp ? 'Create New Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Join AidGo to help save lives or get emergency assistance' 
              : 'Sign in to your AidGo account'
            }
          </p>
        </div>

        {/* Toggle Between Login/Signup */}
        <div className="flex bg-yellow-300 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
              !isSignUp
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <FaSignInAlt className="mr-2" />
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
              isSignUp
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <FaUserPlus className="mr-2" />
            Sign Up
          </button>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-yellow-50 rounded-lg p-1 mb-6 border border-yellow-200">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginMethod === 'email'
                ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
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
                ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <FaPhone className="inline mr-2" />
            Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full pl-10 pr-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
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
                  className="w-full pl-10 pr-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
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
                className="w-full pl-10 pr-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {isSignUp ? <FaUserPlus className="mr-2" /> : <FaSignInAlt className="mr-2" />}
                {isSignUp ? 'Create Account' : 'Sign In'}
              </div>
            )}
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              {isSignUp ? 'Sign in here' : 'Sign up here'}
            </button>
          </p>
        </div>

        {/* Terms for Sign Up */}
        {isSignUp && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <span className="text-blue-600 underline cursor-pointer">Terms of Service</span>
              {' '}and{' '}
              <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          © 2024 AidGo. Connecting lives in emergencies.
        </p>
      </div>
    </div>
  );
};

export default Login;