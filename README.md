# 🚑 AidGo – Emergency Medical Transport App

**AidGo** is a full-stack web application designed to help patients in remote or underserved areas quickly access emergency transportation when ambulances are unavailable. Patients can trigger a request with a single tap, notifying nearby vehicle owners (2-wheelers, 3-wheelers, 4-wheelers), who can accept and provide rapid transport to the nearest healthcare center.

---

## 🌐 Live Demo

Coming soon...

---

## 🧰 Tech Stack

### Frontend
- ⚛️ ReactJS
- 📦 Axios
- 🧭 React Router DOM
- 🎨 Tailwind CSS

### Backend
- 🐍 Flask
- 🔁 Flask-CORS

### APIs & Services
- 🗺️ Google Maps API (Directions + Location)
- 🔥 Firebase (Authentication + Realtime Database / Optional Notifications)

---

## 🚀 Features

- 👥 Dual user roles: **Patient** and **Transporter**
- 🆘 Patient Mode:
  - Secure login
  - One-tap emergency button
  - Sends request to all nearby available drivers
- 🚗 Transporter Mode:
  - Secure login and vehicle registration (license plate, vehicle type)
  - Receives notifications for emergency pickup requests
  - Accepts request and receives navigation to patient location and then to the nearest hospital
- 🧭 Real-time directions using Google Maps API
- 📱 Clean, mobile-responsive UI with Tailwind CSS
- 🔐 Secure client-server interaction with REST API
