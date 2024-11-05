import 'react';
import { Box, Card, CardMedia } from '@mui/material';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
export default function MediaCover() {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{ height: '50%', width: '60%', marginLeft: '18%', display: 'flex' }}
      >
        <Card
          className="h-1/3 w-1/4"
          component="li"
          sx={{
            marginTop: 5,
            flexGrow: 1,
            display: 'flex',
          }}
        >
          {' '}
          <Link href="/games/mihir_game" passHref>
            {' '}
            <CardMedia component="video" autoPlay loop muted>
              {' '}
              <source src="/spell.mp4" type="video/mp4" />
            </CardMedia>
          </Link>
        </Card>
      </Box>
    </Box>
  );
}
