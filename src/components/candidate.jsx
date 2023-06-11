import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Candidate = () => {
  const [candidate, setCandidate] = useState([]);
  const [candidateHRIS, setCandidateHRIS] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newEnglishLevel, setNewEnglishLevel] = useState('');
  const [candidateCount, setCandidateCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/candidate')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCandidate(data.data1);
        setCandidateHRIS(data.data2);
        setCandidateCount(data.data3[0].count);         
      })
      .catch((error) => {
        console.log('Fetch error:', error);
      });
  }, []);
  

  const handleClickOpen = (candidateno, englishlevel) => {
    setEditId(candidateno);
    setNewEnglishLevel(englishlevel);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnglishLevelChange = (event) => {
    setNewEnglishLevel(event.target.value);
  };

  const handleSubmit = () => {
    fetch(`http://localhost:5000/candidate/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ englishlevel: newEnglishLevel }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh the candidate list here to show the updated data
        return fetch('http://localhost:5000/candidate');
      })
      .then((response) => response.json())
      .then((data) => {
        setCandidate(data.data1);
        setCandidateHRIS(data.data2);
      })
      .catch((error) => console.log('Update error:', error));
    setOpen(false);
  };
  

  return (
    <div>
         <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Candidate No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>English Level</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Last Edit Date</TableCell>
            <TableCell>Date Of Birth</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidate.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>{candidate.candidateno}</TableCell>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.surname}</TableCell>
              <TableCell>{candidate.englishlevel}</TableCell>
              <TableCell>{candidate.contactnumber}</TableCell>
              <TableCell>{new Date(candidate.lasteditdate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(candidate.dateofbirth).toLocaleDateString()}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>      
    </TableContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>English Level</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Last Edit Date</TableCell>
              <TableCell>Date Of Birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidateHRIS.map((candidate) => (
              <TableRow key={candidate.candidateno}>
                <TableCell>{candidate.candidateno}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.surname}</TableCell>
                <TableCell>{candidate.englishlevel}</TableCell>
                <TableCell>{candidate.contactnumber}</TableCell>
                <TableCell>{new Date(candidate.lasteditdate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(candidate.dateofbirth).toLocaleDateString()}</TableCell>
                <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleClickOpen(candidate.candidateno, candidate.englishlevel)}>
                  Edit
                </Button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update English Level</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new English Level.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="English Level"
            type="text"
            fullWidth
            value={newEnglishLevel}
            onChange={handleEnglishLevelChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      </TableContainer>
      <h2>There are {candidateCount} candidates from the METU NCC.</h2>
    </div>
  );
};

export default Candidate;
