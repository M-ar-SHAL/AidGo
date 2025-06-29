import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import RoleSelection from './components/RoleSelection';
import PatientDashboard from './components/PatientDashboard';
import TransporterRegistration from './components/TransporterRegistration';
import TransporterDashboard from './components/TransporterDashboard';
import EmergencyRequest from './components/EmergencyRequest';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('aidgo_user');
    const savedRole = localStorage.getItem('aidgo_role');
    
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser));
      setUserRole(savedRole);
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('aidgo_user', JSON.stringify(userData));
  };

  const handleRoleSelection = (role) => {
    setUserRole(role);
    localStorage.setItem('aidgo_role', role);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('aidgo_user');
    localStorage.removeItem('aidgo_role');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              !user ? (
                <Login onLogin={handleLogin} />
              ) : !userRole ? (
                <RoleSelection onRoleSelect={handleRoleSelection} user={user} />
              ) : userRole === 'patient' ? (
                <Navigate to="/patient-dashboard" />
              ) : (
                <Navigate to="/transporter-dashboard" />
              )
            } 
          />
          <Route 
            path="/patient-dashboard" 
            element={
              user && userRole === 'patient' ? (
                <PatientDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/emergency-request" 
            element={
              user && userRole === 'patient' ? (
                <EmergencyRequest user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/transporter-registration" 
            element={
              user && userRole === 'transporter' ? (
                <TransporterRegistration user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/transporter-dashboard" 
            element={
              user && userRole === 'transporter' ? (
                <TransporterDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;