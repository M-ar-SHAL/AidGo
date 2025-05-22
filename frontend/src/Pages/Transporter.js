import axios from 'axios';
import { useState } from 'react';

const Transporter = () => {
  const [form, setForm] = useState({ name: "", vehicle: "" });

  const register = async () => {
    const res = await axios.post('http://localhost:5000/register', {
      ...form,
      role: "transporter"
    });
    alert(res.data.message);
  };

  return (
    <div>
      <h2>Transporter Registration</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Vehicle Type" onChange={e => setForm({...form, vehicle: e.target.value})} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Transporter;
