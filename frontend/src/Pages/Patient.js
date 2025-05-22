import axios from 'axios';
import { useState } from 'react';

const Patient = () => {
  const [name, setName] = useState("");

  const requestHelp = async () => {
    const res = await axios.post('http://localhost:5000/request-help', {
      name,
      location: "DummyLocation",
      role: "patient"
    });
    alert(res.data.message);
  };

  return (
    <div>
      <h2>Patient Page</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
      <button onClick={requestHelp}>Request Emergency Help</button>
    </div>
  );
};

export default Patient;
