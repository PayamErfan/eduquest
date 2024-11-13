'use client';
import 'react';
import Grid from '@mui/system/Grid';
import Navbar from '@/components/Navbar';
import Box from '@mui/material/Box';
import MathTypeHome from '@/components/mathTypeRaceHome';
export default function spell_game() {
  async function getData() {
    const url = 'http://127.0.0.1:8000/new_game';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const json = await response.json();
    return json.question;
  }
  // const data = getData();
  // Handles the Type of Game
  const game_handle = (game_type) => {
    console.log(game_type);
  };

  return (
    <Box component="div" sx={{ backgroundColor: 'white' }}>
      <Grid container rowSpacing={10}>
        <Grid size={12}>
          <Navbar />
        </Grid>
        <MathTypeHome game_handler={game_handle} />
        <Grid size={12}></Grid>
      </Grid>
    </Box>
  );
}
