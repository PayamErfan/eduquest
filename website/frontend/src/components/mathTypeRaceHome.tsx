import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/system/Grid';
export default function MathTypeHome({ game_handler }) {
  return (
    <>
      <Grid size={12}>
        <Box component="div" sx={{ backgroundColor: 'white' }}>
          <Typography align="center" variant="h2" sx={{ color: 'black' }}>
            {' '}
            Welcome to Math Type Race!{' '}
          </Typography>
        </Box>
      </Grid>
      <Grid size={12} align="center">
        <Box sx={{ backgroundColor: 'white' }}>
          {' '}
          {/* Add OnClick Event */}
          <Button variant="contained">
            <Typography
              variant="h4"
              onClick={() => {
                game_handler('Addition');
              }}
            >
              Addition
            </Typography>
          </Button>{' '}
        </Box>{' '}
      </Grid>
      <Grid size={12} align="center">
        <Box sx={{ backgroundColor: 'white' }}>
          <Button
            variant="contained"
            onClick={() => {
              game_handler('Subtraction');
            }}
          >
            <Typography variant="h4">Subtraction</Typography>
          </Button>
        </Box>{' '}
      </Grid>
      <Grid size={12} align="center">
        <Box sx={{ backgroundColor: 'white' }}>
          <Button
            variant="contained"
            onClick={() => {
              game_handler('Both');
            }}
          >
            <Typography variant="h4">Both</Typography>
          </Button>
        </Box>{' '}
      </Grid>
    </>
  );
}
