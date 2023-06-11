import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PositionQualifications = () => {
  const [positionQualificationsData, setPositionQualificationsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/position-qualifications')
      .then(response => response.json())
      .then(data => setPositionQualificationsData(data))
      .catch(error => console.log('Fetch error:', error));
  }, []);

  const handleDelete = (position_code) => {
    fetch(`http://localhost:5000/position-qualifications/${position_code}`, { method: 'DELETE' })
      .then(() => {
        console.log('Deleted successfully.');
        // Fetch the updated data
        return fetch('http://localhost:5000/position-qualifications');
      })
      .then(response => response.json())
      .then(data => setPositionQualificationsData(data))
      .catch(error => console.log('Delete error:', error));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position Code</TableCell>
              <TableCell>Qualifications</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positionQualificationsData.map((row) => (
              <TableRow key={row.position_code}>
                <TableCell>{row.position_code}</TableCell>
                <TableCell>{row.position_qualifications}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.position_code)}>
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

export default PositionQualifications;
