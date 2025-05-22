import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from './pages/Home';
import Home from './Pages/Home'
import Patient from './Pages/Patient'
import Transporter from './Pages/Transporter'
import Requests from './Pages/Requests'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/transporter" element={<Transporter />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
    </Router>
  );
}

export default App;
