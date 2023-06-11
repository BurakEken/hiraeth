// components/Hrbpint2questions.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Hrbpint2questions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/hrbp-int2-questions')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Interview2ID</TableCell>
            <TableCell>HRBP+HMLM Questions</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.interview2id}</TableCell>
              <TableCell>{row.hrbp_questions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Hrbpint2questions;
