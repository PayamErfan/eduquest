import 'react';
import { Card, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
export default function MediaCover() {
  return (
    <div style = {{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      marginTop: "40px",
    }}>
      <Navbar />
      <div>
        <Link href="/games/formula_1" passHref>
          {' '}
          <video 
            className="w-3/4"
            style={{ height: '250px', borderRadius: '8px' }}
            controls>
            <source src="/formula1/formula.mp4" />
          </video>
        </Link>
      </div>
      <div>
        <Link href="/games/mapQuest" passHref>
          {' '}
          <video 
            className="w-3/4"
            style={{ height: '250px', borderRadius: '8px' }}
            controls>
            <source src="spell.mp4" />
          </video>
        </Link>
      </div>
      <div>
        <Link href="/games/WordQuest-main" passHref>
          {' '}
          <video 
            className="w-3/4"
            style={{ height: '250px', borderRadius: '8px' }}
            controls>
            <source src="spell.mp4" />
          </video>
        </Link>
      </div>
    </div>
    // <Grid container>
    //   <Grid size={12}>
    //     <Navbar />
    //   </Grid>
    //   <Grid justifyItems="center" size={12}>
    //     <Card
    //       component="li"
    //       sx={{
    //         marginTop: 5,
    //         flexGrow: 1,
    //         display: 'flex',
    //         width: 'auto',
    //       }}
    //     >
    //       {' '}
    //       <Link href="/games/formula_1" passHref>
    //         {' '}
    //         <div className="w-3/4 h-3/4">
    //           <CardMedia component="video" autoPlay loop muted>
    //             {' '}
    //             <source src="/formula1/formula.mp4" type="video/mp4" />
    //           </CardMedia>
    //         </div>
    //       </Link>
    //     </Card>
    //   </Grid>
    // </Grid>
  );
}
