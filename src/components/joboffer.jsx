// components/Joboffer.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Joboffer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/joboffer')
      .then((response) => response.json())
      .then((data) => setCount(data[0].count));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>          
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Number of job offers where salary is less than 30000 and offerdate is after 2023-01-01: {count}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Joboffer;
