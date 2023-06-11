import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/login';
import Candidate from './components/candidate';
import Overview from './components/overview';
import Joboffer from './components/joboffer';
import HMLM from './components/hmlm';
import Hrbp from './components/hrbp';
import Education from './components/education';
import Positionqualifications from './components/position-qualifications';
import Hrbpint2questions from './components/hrbp-int2-questions';
import Hrbpint1questions from './components/hrbp-int1-questions';
import Hmlmint2questions from './components/hmlm-int2-questions';

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/candidate" element={<Candidate />} />
      <Route path="/joboffer" element={<Joboffer />} />
      <Route path="/hmlm" element={<HMLM />} />
      <Route path="/hrbp" element={<Hrbp />} />
      <Route path="/education" element={<Education />} />
      <Route path="/position-qualifications" element={<Positionqualifications />} />
      <Route path="/hrbp-int2-questions" element={<Hrbpint2questions />} />
      <Route path="/hrbp-int1-questions" element={<Hrbpint1questions />} />
      <Route path="/hmlm-int2-questions" element={<Hmlmint2questions />} />
    </Routes>
  );
}

export default App;
