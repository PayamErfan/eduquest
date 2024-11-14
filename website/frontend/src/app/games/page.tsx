import 'react';
import { Card, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
export default function MediaCover() {
  return (
    <Grid container>
      <Grid size={12}>
        <Navbar />
      </Grid>
      <Grid justifyItems="center" size={12}>
        <Card
          component="li"
          sx={{
            marginTop: 5,
            flexGrow: 1,
            display: 'flex',
            width: 'auto',
          }}
        >
          {' '}
          <Link href="/games/formula_1" passHref>
            {' '}
            <CardMedia component="video" autoPlay loop muted>
              {' '}
              <source src="/spell.mp4" type="video/mp4" />
            </CardMedia>
          </Link>
        </Card>
      </Grid>
    </Grid>
  );
}
