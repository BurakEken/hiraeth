import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const HMLM = () => {
  const [emp_no, setEmpNo] = useState('');
  const [firstname, setFirstName] = useState('');
  const [surname, setSurName] = useState('');

  const handleEmpNoChange = (event) => {
    setEmpNo(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleSurNameChange = (event) => {
    setSurName(event.target.value);
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/hmlm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emp_no: emp_no, firstname: firstname, surname: surname }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log('Insertion error:', error));
  };

  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="emp_no"
        label="Employee Number"
        type="text"
        fullWidth
        value={emp_no}
        onChange={handleEmpNoChange}
      />

      <TextField
        autoFocus
        margin="dense"
        id="firstname"
        label="First Name"
        type="text"
        fullWidth
        value={firstname}
        onChange={handleFirstNameChange}
      />

      <TextField
        autoFocus
        margin="dense"
        id="surname"
        label="Surname"
        type="text"
        fullWidth
        value={surname}
        onChange={handleSurNameChange}
      />

      <Button onClick={handleSubmit} color="primary">
        Add New HM/LM
      </Button>
    </div>
  );
};

export default HMLM;
