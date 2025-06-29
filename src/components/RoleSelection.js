import React from 'react';
import { FaUserInjured, FaCar, FaHeartbeat, FaRoute } from 'react-icons/fa';

const RoleSelection = ({ onRoleSelect, user }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to AidGo</h1>
          <p className="text-gray-600">How would you like to use our service today?</p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Patient Card */}
          <div
            onClick={() => onRoleSelect('patient')}
            className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 cursor-pointer hover:border-red-400 transition-all card-hover group"
          >
            <div className="text-center">
              <div className="bg-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaUserInjured className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">I Need Emergency Help</h3>
              <p className="text-gray-600 mb-4">
                Request immediate transportation to the nearest healthcare facility
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaHeartbeat className="mr-1 text-red-500" />
                  Emergency
                </div>
                <div className="flex items-center">
                  <FaRoute className="mr-1 text-red-500" />
                  Fast Response
                </div>
              </div>
            </div>
          </div>

          {/* Transporter Card */}
          <div
            onClick={() => onRoleSelect('transporter')}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition-all card-hover group"
          >
            <div className="text-center">
              <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaCar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">I Want to Help Others</h3>
              <p className="text-gray-600 mb-4">
                Register as a transporter and help people in emergency situations
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaCar className="mr-1 text-blue-500" />
                  Vehicle Required
                </div>
                <div className="flex items-center">
                  <FaHeartbeat className="mr-1 text-blue-500" />
                  Save Lives
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Logged in as: {user.email || user.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;