export async function initialStart() {
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
export function game_start() {
  const audio = document.getElementById('game_sound');
  if (audio) {
    audio.play();
  }
  //   const parent_grid = document.getElementById('overall_grid');
  const start_b = document.getElementById('start_button');
  start_b.style.display = 'None';
  let easy_bt = document.getElementById('easy_b');
  let med_bt = document.getElementById('med_b');
  let hard_bt = document.getElementById('hard_b');
  let buttons = [easy_bt, med_bt, hard_bt];
  buttons.forEach((element) => (element.style.display = 'block'));
}
export function operation(op) {
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
}
export function diff(diffict) {
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
}
export function ready_up(data) {
  let opt1_b = document.getElementById('op1_b');
  let opt2_b = document.getElementById('op2_b');
  let opt3_b = document.getElementById('op3_b');
  let opt4_b = document.getElementById('op4_b');
  let answer = data['correct_option'];
  let choices = data['answer_options'];
  let options_arr = [opt1_b, opt2_b, opt3_b, opt4_b];
  options_arr.forEach((element, index) => {
    element.innerHTML = choices[index];
    element.style.display = 'block';
  });
  let question = document.getElementById('question_top');
  question.innerHTML = data['question'];
}
export function digits(digits) {
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
    .then((data) => {
      console.log(data);
      data['question_sound'] = data['question_sound'].blob();
      ready_up(data);
    })
    .catch((error) => console.log('move on with your life', error));
  console.log(data_send);
}
