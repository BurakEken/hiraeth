import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Login = () => {
  const [role, setrole] = useState('');
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useState('');

  const handleRoleChange = (e) => {
    setrole(e.target.value);
  };

  const handleAuthCodeChange = (e) => {
    setAuthCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, authCode })
    });

    if(response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify({ role, ...userData }));
        navigate('/overview');
    } else {
        // handle error
        alert('Invalid role or authorization code');
    }
  };

  return (
    <Container maxWidth="xs" 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center'
      }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            onChange={handleRoleChange}
          >
            <MenuItem value="HMLM">HMLM</MenuItem>
            <MenuItem value="HRBP">HRBP</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="authCode"
          variant="outlined"
          type="authCode"
          value={authCode}
          onChange={handleAuthCodeChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
