import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Select Role</h2>
      <button onClick={() => navigate('/patient')}>Patient</button>
      <button onClick={() => navigate('/transporter')}>Transporter</button>
    </div>
  );
};

export default Home;
