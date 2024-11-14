'use client';
import 'react';
import Grid from '@mui/system/Grid';
import Navbar from '@/components/Navbar';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { start } from 'repl';
export default function Formula_game() {
  // const router = useRouter();
  // Easy =1 , Med = 2, Hard =3 , pixels to move oponent;
  var data_send = {};
  var enemy_speed;

  const button_style = {
    mt: 2,
    width: 200,
    top: -1000,
    left: 630,
    position: 'relative',
    display: 'None',
  };

  async function initialStart() {
    try {
      const path = 'http://127.0.0.1:8000/formula_1_1/start';
      fetch(path)
        .then((response) => response.blob())
        .then((data) => {
          const audioURL = URL.createObjectURL(data);
          const audioElement = document.createElement('audio');
          audioElement.src = audioURL;
          audioElement.controls = true;
          document.body.appendChild(audioElement);
          console.log(audioElement);
          audioElement.loop = true;
          audioElement.id = 'game_sound';
          audioElement.style.display = 'None';
        });
    } catch (error) {
      console.log('Error, move on with life', error);
    }
  }
  const game_start = () => {
    const audio = document.getElementById('game_sound');
    if (audio) {
      audio.play();
    }
    const parent_grid = document.getElementById('overall_grid');
    const start_b = document.getElementById('start_button');
    start_b.style.display = 'None';
    let easy_bt = document.getElementById('easy_b');
    let med_bt = document.getElementById('med_b');
    let hard_bt = document.getElementById('hard_b');
    let buttons = [easy_bt, med_bt, hard_bt];
    buttons.forEach((element) => (element.style.display = 'block'));
  };
  const operation = (op) => {
    data_send['operation_type'] = op;
    let add_bt = document.getElementById('add_b');
    let sub_bt = document.getElementById('sub_b');
    let both_bt = document.getElementById('both_b');
    let op_buttons = [add_bt, sub_bt, both_bt];
    op_buttons.forEach((element) => {
      element.style.display = 'none';
    });
    let upto10_bt = document.getElementById('10_b');
    let pass10_bt = document.getElementById('100_b');
    let digits_buttons = [upto10_bt, pass10_bt];
    digits_buttons.forEach((element) => {
      element.style.display = 'block';
    });
  };
  const diff = (diffict) => {
    enemy_speed = diffict;
    let easy_bt = document.getElementById('easy_b');
    let med_bt = document.getElementById('med_b');
    let hard_bt = document.getElementById('hard_b');
    let buttons = [easy_bt, med_bt, hard_bt];
    buttons.forEach((element) => {
      element.style.display = 'None';
    });
    let add_bt = document.getElementById('add_b');
    let sub_bt = document.getElementById('sub_b');
    let both_bt = document.getElementById('both_b');
    let op_buttons = [add_bt, sub_bt, both_bt];
    op_buttons.forEach((element) => {
      element.style.display = 'block';
    });
    console.log(enemy_speed);
  };
  const digits = (digits) => {
    let upto10_bt = document.getElementById('10_b');
    let pass10_bt = document.getElementById('100_b');
    let digits_buttons = [upto10_bt, pass10_bt];
    digits_buttons.forEach((element) => {
      element.style.display = 'None';
    });
    data_send['digits'] = digits;
    fetch('http://127.0.0.1:8000/formula_1_1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_send),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log('move on with your life', error));
    console.log(data_send);
  };
  // Handles the Type of Game
  useEffect(() => {
    initialStart();
    const start_button = document.getElementById('start_button');
    console.log(start_button);
    if (start_button) {
      start_button.style.display = 'block';
      start_button.addEventListener('click', game_start);
    }
    return () => {
      if (start_button) {
        start_button.removeEventListener('click', game_start);
      }
    };
  }, []);

  return (
    <Grid id="overall_grid" container direction="column" alignItems="center">
      <Grid size={12}>
        <Navbar />
      </Grid>
      <Grid size={12}>
        <Box
          sx={{
            width: 'auto',
            position: 'relative',
            objectFit: 'cover',
            left: '37%',
            right: 0,
            top: 135,
            zIndex: 3,
          }}
        >
          <Typography variant="h2" sx={{ color: 'black' }}>
            Formula 1 + 1
          </Typography>
        </Box>
        <Box component="img" src="/racetrack.png"></Box>
        <Box
          id="blue_car"
          component="img"
          src="/blue_car.png"
          sx={{
            width: 'auto',
            height: 200,
            maxWidth: 200,
            maxHeight: 200,
            objectFit: 'cover',
            borderRadius: 2,
            position: 'relative',
            top: -275, // Adjust this to move the image up or down
            left: 0, // Adjust this to move the image left or right
            zIndex: 3,
          }}
        ></Box>
        <Box
          id="red_car"
          component="img"
          src="/red_car.png"
          sx={{
            width: 'auto',
            height: 200,
            maxWidth: 200,
            maxHeight: 200,
            objectFit: 'cover',
            borderRadius: 2,
            position: 'relative',
            top: -425, // Adjust this to move the image up or down
            left: 0, // Adjust this to move the image left or right
            zIndex: 3,
          }}
        ></Box>

        <Button id="start_button" sx={button_style} variant="contained">
          START
        </Button>
        <Button
          id="easy_b"
          sx={button_style}
          onClick={() => {
            diff(1);
          }}
          variant="contained"
        >
          Easy
        </Button>
        <Button
          id="med_b"
          sx={button_style}
          onClick={() => {
            diff(2);
          }}
          variant="contained"
        >
          Medium
        </Button>
        <Button
          id="hard_b"
          sx={button_style}
          onClick={() => {
            diff(3);
          }}
          variant="contained"
        >
          Hard
        </Button>
        <Button
          id="add_b"
          sx={button_style}
          onClick={() => {
            operation('addition');
          }}
          variant="contained"
        >
          Addition
        </Button>
        <Button
          id="sub_b"
          sx={button_style}
          onClick={() => {
            operation('subtraction');
          }}
          variant="contained"
        >
          Subtraction
        </Button>
        <Button
          id="both_b"
          sx={button_style}
          onClick={() => {
            operation('both');
          }}
          variant="contained"
        >
          Both
        </Button>
        <Button
          id="10_b"
          sx={button_style}
          onClick={() => {
            digits('1-10');
          }}
          variant="contained"
        >
          1-10
        </Button>
        <Button
          id="100_b"
          sx={button_style}
          onClick={() => {
            digits('1-100');
          }}
          variant="contained"
        >
          1-100
        </Button>
      </Grid>
    </Grid>
  );
}
