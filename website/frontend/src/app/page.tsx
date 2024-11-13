import Navbar from '../components/Navbar';
import React from 'react';
import TextField from '@mui/material/TextField';

export default function Home() {
  return (
    <div>
      <Navbar />
      
      <div style={{padding: '20px'}}>
        <div style={{padding: '20px'}}>
          <TextField
            id="outlined-multiline-flexible"
            label="Name"
            placeholder="Email"
            multiline
            maxRows={4}
          />
        </div>
        <div style={{padding: '20px'}}>
        <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="Email"
          multiline
        />
        </div>
        <div style={{padding: '20px'}}>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          placeholder="Please input your message here!"
        />
        </div>
      </div>


    </div>
  );
}
