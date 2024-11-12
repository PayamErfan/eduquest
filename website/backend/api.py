import os
import random
import asyncio
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from pygame import mixer
from lmnt.api import Speech
from dotenv import load_dotenv
import pygame

# Load environment variables
load_dotenv()

# Initialize the API key
api_key = os.getenv('LMNT_API_KEY')

# FastAPI instance
app = FastAPI()

# Pygame initialization
pygame.init()
mixer.init()

# Game Variables
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
PLAYER_MOVE_AMOUNT = 150
DIFFICULTY = 1  # Default to easy
ENEMY_SPEED_RANGE = [0, DIFFICULTY]  # Enemy can move randomly between 0 and DIFFICULTY units

# Fonts
font = pygame.font.SysFont("Verdana", 40)
font_small = pygame.font.SysFont("Verdana", 20)

# Game States
operation_type = "addition"  # Default operation type

# Player class (No changes for API)
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill((0, 0, 255))  # Blue
        self.rect = self.image.get_rect()
        self.rect.center = (50, SCREEN_HEIGHT - 100)

    def move(self):
        self.rect.move_ip(PLAYER_MOVE_AMOUNT, 0)

# Game state for tracking player and enemy status
class GameState:
    def __init__(self):
        self.player = Player()
        self.enemy = pygame.sprite.Sprite()
        self.enemy.image = pygame.Surface((50, 50))
        self.enemy.image.fill((255, 0, 0))  # Red
        self.enemy.rect = self.enemy.image.get_rect()
        self.enemy.rect.center = (50, SCREEN_HEIGHT - 50)
        self.game_over = False
        self.feedback = ""
        self.user_input = ""
        self.score = 0
        self.question = ""
        self.correct_answer = 0
        self.time = 0  # Time in seconds

    def reset_game(self):
        self.player = Player()
        self.enemy = pygame.sprite.Sprite()
        self.enemy.image = pygame.Surface((50, 50))
        self.enemy.image.fill((255, 0, 0))  # Red
        self.enemy.rect = self.enemy.image.get_rect()
        self.enemy.rect.center = (50, SCREEN_HEIGHT - 50)
        self.game_over = False
        self.feedback = ""
        self.user_input = ""
        self.score = 0

# Create a global game state instance
game_state = GameState()

# Model for request payload
class Answer(BaseModel):
    answer: int

# Generate a random math question
async def generate_question(operation_type):
    num1 = random.randint(1, 10)
    num2 = random.randint(1, 10)

    if operation_type == "addition":
        question_text = f"{num1} + {num2} = ?"
        correct_answer = num1 + num2
    elif operation_type == "subtraction":
        # Ensure num1 is greater than or equal to num2
        if num1 < num2:
            num1, num2 = num2, num1
        question_text = f"{num1} - {num2} = ?"
        correct_answer = num1 - num2
    else:  # Randomly choose addition or subtraction
        if random.choice(["addition", "subtraction"]) == "addition":
            question_text = f"{num1} + {num2} = ?"
            correct_answer = num1 + num2
        else:
            if num1 < num2:
                num1, num2 = num2, num1
            question_text = f"{num1} - {num2} = ?"
            correct_answer = num1 - num2

    # Use LMNT API to synthesize the question
    async with Speech(api_key=api_key) as speech:
        lmnt_text = f"{num1} {'plus' if operation_type == 'addition' else 'minus'} {num2}."
        synthesis = await speech.synthesize(lmnt_text, 'lily')
    
    # Save audio file
    try:
        with open('question.mp3', 'wb') as f:
         f.write(synthesis['audio'])
        mixer.music.load("question.mp3")
        mixer.music.set_volume(0.7)
        mixer.music.play()
    except Exception as e:
        print(e)

    return question_text, correct_answer

# API endpoint to get the current question
@app.get("/question")
async def get_question():
    question, correct_answer = await generate_question(operation_type)
    return {"question": question}

# API endpoint to answer a question
@app.post("/answer")
async def answer_question(answer: Answer):
    global game_state
    if game_state.game_over:
        raise HTTPException(status_code=400, detail="Game over! Please start a new game.")

    # Check if the answer is correct
    if answer.answer == game_state.correct_answer:
        game_state.score += 1
        game_state.player.move()
        game_state.feedback = "Correct! Move forward."
    else:
        game_state.feedback = "Incorrect answer. Try again."

    # Check if the player has won
    if game_state.player.rect.right >= SCREEN_WIDTH - 50:
        game_state.game_over = True
        return {"message": "You win!", "score": game_state.score}

    return {"message": game_state.feedback, "score": game_state.score}

# API endpoint to start a new game
@app.get("/new_game")
async def new_game():
    game_state.reset_game()
    question, correct_answer = await generate_question(operation_type)
    game_state.question = question
    game_state.correct_answer = correct_answer
    return {"message": "New game started", "question": question}

# API endpoint to select operation type
@app.post("/set_operation" )
async def set_operation(operation: str):
    global operation_type
    if operation not in ["addition", "subtraction", "both"]:
        raise HTTPException(status_code=400, detail="Invalid operation type.")
    operation_type = operation
    return {"message": f"Operation set to {operation_type}"}

# API endpoint to select difficulty
@app.post("/set_difficulty")
async def set_difficulty(dif: Answer):
    difficulty = dif.answer
    if difficulty not in [1, 2, 3]:
        raise HTTPException(status_code=400, detail="Invalid difficulty level.")
    game_state.enemy.rect.x = difficulty * 100  # Adjust enemy speed
    return {"message": f"Difficulty set to {difficulty}"}

# Main entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
