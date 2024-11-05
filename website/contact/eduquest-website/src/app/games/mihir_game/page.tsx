import 'react';
import Navbar from '@/components/Navbar';
import Pygame_config from '@/components/Pygame_config';
import { Box } from '@mui/material';

export default function spell_game() {
  return (
    <Box>
      <Navbar />
      <Pygame_config />
    </Box>
  );
}
