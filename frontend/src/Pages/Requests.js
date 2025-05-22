import axios from 'axios';
import { useEffect, useState } from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/get-requests').then(res => {
      setRequests(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Available Emergency Requests</h2>
      {requests.map(r => (
        <div key={r._id}>
          <p>Patient: {r.name}</p>
          <button onClick={() => acceptRequest(r._id)}>Accept</button>
        </div>
      ))}
    </div>
  );

  async function acceptRequest(id) {
    await axios.post(`http://localhost:5000/accept-request/${id}`);
    alert("Request accepted!");
  }
};

export default Requests;
