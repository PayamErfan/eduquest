'use client';
import React from 'react';
// import Grid from '@mui/system/Grid';
// import Navbar from '@/components/Navbar';
// import Box from '@mui/material/Box';
// import { Typography, Button } from '@mui/material';
// import { useEffect } from 'react';
// import {
//   initialStart,
//   game_start,
//   operation,
//   diff,
//   digits,
// } from './formula_handlers';
import MathRacingGame from './MathRacingGame.js';
export default function Formula_game() {
  // const router = useRouter();
  // Easy =1 , Med = 2, Hard =3 , pixels to move oponent;
  // make timer div, question div, and use buttons to show them,
  // var data_send = {};
  // var enemy_speed;
  // var question_data;
  // const button_style = {
  //   mt: 2,
  //   width: 200,
  //   top: -1000,
  //   left: 630,
  //   position: 'relative',
  //   display: 'None',
  // };

  // // Handles the Type of Game
  // useEffect(() => {
  //   initialStart();
  //   const start_button = document.getElementById('start_button');
  //   console.log(start_button);
  //   if (start_button) {
  //     start_button.style.display = 'block';
  //     start_button.addEventListener('click', game_start);
  //   }
  //   return () => {
  //     if (start_button) {
  //       start_button.removeEventListener('click', game_start);
  //     }
  //   };
  // }, []);

  // return (
  //   <Grid id="overall_grid" container direction="column" alignItems="center">
  //     <Grid size={12}>
  //       <Navbar />
  //     </Grid>
  //     <Grid size={12}>
  //       <Box
  //         sx={{
  //           width: 'auto',
  //           position: 'relative',
  //           objectFit: 'cover',
  //           left: '37%',
  //           right: 0,
  //           top: 135,
  //           zIndex: 3,
  //         }}
  //       >
  //         <Typography id="question_top" variant="h2" sx={{ color: 'black' }}>
  //           Formula 1 + 1
  //         </Typography>
  //       </Box>
  //       <Box component="img" src="/racetrack.png"></Box>
  //       <Box
  //         id="blue_car"
  //         component="img"
  //         src="/blue_car.png"
  //         sx={{
  //           width: 'auto',
  //           height: 200,
  //           maxWidth: 200,
  //           maxHeight: 200,
  //           objectFit: 'cover',
  //           borderRadius: 2,
  //           position: 'relative',
  //           top: -275, // Adjust this to move the image up or down
  //           left: 0, // Adjust this to move the image left or right
  //           zIndex: 3,
  //         }}
  //       ></Box>
  //       <Box
  //         id="red_car"
  //         component="img"
  //         src="/red_car.png"
  //         sx={{
  //           width: 'auto',
  //           height: 200,
  //           maxWidth: 200,
  //           maxHeight: 200,
  //           objectFit: 'cover',
  //           borderRadius: 2,
  //           position: 'relative',
  //           top: -425, // Adjust this to move the image up or down
  //           left: 0, // Adjust this to move the image left or right
  //           zIndex: 3,
  //         }}
  //       ></Box>

  //       <Button id="start_button" sx={button_style} variant="contained">
  //         START
  //       </Button>
  //       <Button
  //         id="easy_b"
  //         sx={button_style}
  //         onClick={() => {
  //           diff(1);
  //         }}
  //         variant="contained"
  //       >
  //         Easy
  //       </Button>
  //       <Button
  //         id="med_b"
  //         sx={button_style}
  //         onClick={() => {
  //           diff(2);
  //         }}
  //         variant="contained"
  //       >
  //         Medium
  //       </Button>
  //       <Button
  //         id="hard_b"
  //         sx={button_style}
  //         onClick={() => {
  //           diff(3);
  //         }}
  //         variant="contained"
  //       >
  //         Hard
  //       </Button>
  //       <Button
  //         id="add_b"
  //         sx={button_style}
  //         onClick={() => {
  //           operation('addition');
  //         }}
  //         variant="contained"
  //       >
  //         Addition
  //       </Button>
  //       <Button
  //         id="sub_b"
  //         sx={button_style}
  //         onClick={() => {
  //           operation('subtraction');
  //         }}
  //         variant="contained"
  //       >
  //         Subtraction
  //       </Button>
  //       <Button
  //         id="both_b"
  //         sx={button_style}
  //         onClick={() => {
  //           operation('both');
  //         }}
  //         variant="contained"
  //       >
  //         Both
  //       </Button>
  //       <Button
  //         id="10_b"
  //         sx={button_style}
  //         onClick={() => {
  //           digits('1-10');
  //         }}
  //         variant="contained"
  //       >
  //         1-10
  //       </Button>
  //       <Button
  //         id="100_b"
  //         sx={button_style}
  //         onClick={() => {
  //           digits('1-100');
  //         }}
  //         variant="contained"
  //       >
  //         1-100
  //       </Button>

  //       <Button
  //         id="op1_b"
  //         sx={button_style}
  //         onClick={() => {}}
  //         variant="contained"
  //       >
  //         option1
  //       </Button>
  //       <Button
  //         id="op2_b"
  //         sx={button_style}
  //         onClick={() => {}}
  //         variant="contained"
  //       >
  //         option2
  //       </Button>
  //       <Button
  //         id="op3_b"
  //         sx={button_style}
  //         onClick={() => {}}
  //         variant="contained"
  //       >
  //         option3
  //       </Button>
  //       <Button
  //         id="op4_b"
  //         sx={button_style}
  //         onClick={() => {}}
  //         variant="contained"
  //       >
  //         option4
  //       </Button>
  //     </Grid>
  //   </Grid>
  // );
  return <MathRacingGame />;
}
