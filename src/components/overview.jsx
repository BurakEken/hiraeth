import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper } from '@mui/material';

const boxes = [
  { route: 'candidate', name: 'Candidate' },
  { route: 'joboffer', name: 'Job Offer' },
  { route: 'hmlm', name: 'HMLM' },
  { route: 'hrbp', name: 'HRBP' },
  { route: 'education', name: 'Education' },
  { route: 'position-qualifications', name: 'Position Qualifications' },
  { route: 'hrbp-int2-questions', name: 'Interview 2 Questions' },
  { route: 'hrbp-int1-questions', name: 'HRBP Int1 Questions' },
  { route: 'hmlm-int2-questions', name: 'HMLM Int2 Questions' },
];

const Overview = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleBoxClick = (boxRoute) => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    // restrict HMLM user from accessing the 'hrbp-int1-questions' route
    if (user.role === 'HMLM' && boxRoute === 'hrbp-int1-questions') {
      alert('You are not authorized to access this page.');
    } else {
      navigate(`/${boxRoute}`);
    }
  };
  

  return (
    <div>
      <h1>Overview Page</h1>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      <Grid container spacing={3}>
        {boxes.map((box) => (
          <Grid item xs={4} key={box.route}>
            <Paper onClick={() => handleBoxClick(box.route)} style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {box.name}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Overview;
