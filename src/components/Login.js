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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* App Name - Centered */}
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold text-green-600 mb-4 tracking-wide">AidGo</h1>
        <p className="text-xl text-gray-600 font-medium">Emergency Transport at Your Fingertips</p>
      </div>

      {/* Login Card - Yellowish */}
      <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-2xl shadow-xl p-8 w-full max-w-md border border-yellow-400">
        {/* Login Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </h2>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-yellow-100 rounded-lg p-1 mb-6 border border-yellow-300">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginMethod === 'email'
                ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-800'
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
                ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FaPhone className="inline mr-2" />
            Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === 'email' ? (
            <div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
                  placeholder="Phone number or email"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
                  placeholder="Phone number or email"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {isSignUp ? <FaUserPlus className="mr-2" /> : <FaSignInAlt className="mr-2" />}
                {isSignUp ? 'Sign Up' : 'Log In'}
              </div>
            )}
          </button>
        </form>

        {/* Sign Up Option at Bottom */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-600 hover:text-green-700 font-medium underline"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;