import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Education = () => {
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/education')
      .then(response => response.json())
      .then(data => setEducationData(data))
      .catch(error => console.log('Fetch error:', error));
  }, []);

  const handleDelete = (candidateno) => {
    fetch(`http://localhost:5000/education/${candidateno}`, { method: 'DELETE' })
      .then(() => {
        console.log('Deleted successfully.');
        // Fetch the updated data
        return fetch('http://localhost:5000/education');
      })
      .then(response => response.json())
      .then(data => setEducationData(data))
      .catch(error => console.log('Delete error:', error));
  };

  const handleUpdate = (candidateno) => {
    fetch(`http://localhost:5000/education/${candidateno}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ education: 'METU NCC' }),
    })
      .then(() => {
        console.log('Updated successfully.');
        // Fetch the updated data
        return fetch('http://localhost:5000/education');
      })
      .then(response => response.json())
      .then(data => setEducationData(data))
      .catch(error => console.log('Update error:', error));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate No</TableCell>
              <TableCell>Education</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {educationData.map((row) => (
              <TableRow key={row.candidateno}>
                <TableCell>{row.candidateno}</TableCell>
                <TableCell>{row.education}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleUpdate(row.candidateno)}>
                    Update
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.candidateno)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Education;
