import pygame, sys, random, time, os, asyncio
from pygame.locals import *
from pygame import mixer
from lmnt.api import Speech
from dotenv import load_dotenv

# Initializations
load_dotenv()
pygame.init()
mixer.init()
# Retrieve the API key from environment variables
api_key = os.getenv('LMNT_API_KEY')

# Screen settings
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
DISPLAYSURF = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Math Type Race")

# Colors
BLUE = (0, 0, 255)
RED = (255, 0, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)

# Game Variables
PLAYER_MOVE_AMOUNT = 150
DIFFICULTY = 1  # Default to easy
ENEMY_SPEED_RANGE = [0, DIFFICULTY]  # Enemy can move randomly between 0 and DIFFICULTY units

FINISH_LINE = SCREEN_WIDTH - 50  # The finish line is near the right side of the screen
FPS = 60
QUESTION_DELAY = 2  # Time to display the question

# Fonts
font = pygame.font.SysFont("Verdana", 40)
font_small = pygame.font.SysFont("Verdana", 20)
winner_text = font.render("", True, BLACK)

# Game States
home_screen = True
operation_type = None  # This will store "addition", "subtraction", or "both"

# Player class
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(BLUE)
        self.rect = self.image.get_rect()
        self.rect.center = (50, SCREEN_HEIGHT - 100)

    def move(self):
        self.rect.move_ip(PLAYER_MOVE_AMOUNT, 0)

# Enemy class
class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        self.rect.center = (50, SCREEN_HEIGHT - 50)

    def move(self):
        self.rect.move_ip(random.choice(ENEMY_SPEED_RANGE), 0)

# Generate a random math question
async def generate_question(operation_type):
    num1 = random.randint(1, 10)
    num2 = random.randint(1, 10)

    if operation_type == "addition":
        lmnt_text = question_text = f"{num1} + {num2} = ?"
        correct_answer = num1 + num2
    elif operation_type == "subtraction":
        # Ensure num1 is always greater than or equal to num2 to avoid negative results
        if num1 < num2:
            num1, num2 = num2, num1
        question_text = f"{num1} - {num2} = ?"
        lmnt_text = f"{num1} minus {num2} = ?"
        correct_answer = num1 - num2
    else:  # Both, randomly choose addition or subtraction
        if random.choice(["addition", "subtraction"]) == "addition":
            lmnt_text = question_text = f"{num1} + {num2} = ?"
            correct_answer = num1 + num2
        else:
            # Ensure num1 is always greater than or equal to num2 for subtraction
            if num1 < num2:
                num1, num2 = num2, num1
            question_text = f"{num1} - {num2} = ?"
            lmnt_text = f"{num1} minus {num2} = ?"
            correct_answer = num1 - num2

    async with Speech(api_key=api_key) as speech:
        synthesis = await speech.synthesize(lmnt_text, 'lily')
    
    # Save the audio file
    try:
        with open('question.mp3', 'wb') as f:
            f.write(synthesis['audio'])
    except Exception as e:
        print(f'permision Error {e}')
    mixer.music.load("question.mp3")
    mixer.music.set_volume(0.7)
    mixer.music.play()

    return question_text, correct_answer

# Game loop
async def game_loop():
    player = Player()
    enemy = Enemy()

    all_sprites = pygame.sprite.Group()
    all_sprites.add(player)
    all_sprites.add(enemy)

    FramePerSec = pygame.time.Clock()
    game_over = False
    user_input = ""
    feedback = ""  # Feedback message for incorrect answers
    question, correct_answer = await generate_question(operation_type)  # Initial question generation
    
    while True:
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()

            if not game_over:
                # Handle user input for the math question
                if event.type == KEYDOWN:
                    if event.unicode.isdigit():  # Check if the input is a number
                        user_input += event.unicode
                    if event.key == K_RETURN or event.key == K_KP_ENTER:  # If the user presses Enter
                        if user_input == str(correct_answer):
                            player.move()  # Move the player forward if the answer is correct
                            feedback = ""  # Clear feedback for correct answer
                            user_input = ""  # Clear input

                            # Check if the game is over (before generating a new question)
                            if not game_over and player.rect.right < FINISH_LINE and enemy.rect.right < FINISH_LINE:
                                question, correct_answer = await generate_question(operation_type)
                        else:
                            feedback = "Sorry, try again. Incorrect answer."
                            user_input = ""  # Reset input for retrying

        if not game_over:
            # Move the enemy forward
            enemy.move()

            # Check if someone reached the finish line
            if player.rect.right >= FINISH_LINE:
                winner_text = font.render("Player Wins!", True, BLACK)
                game_over = True
            elif enemy.rect.right >= FINISH_LINE:
                winner_text = font.render("Enemy Wins!", True, BLACK)
                game_over = True

        # Clear the screen
        DISPLAYSURF.fill(WHITE)

        # Display the math question and feedback
        if not game_over:  # Only display question if the game is ongoing
            question_text = font_small.render(question, True, BLACK)
            DISPLAYSURF.blit(question_text, (SCREEN_WIDTH // 2 - 100, 10))

        # Show feedback for incorrect answers
        if feedback:
            feedback_text = font_small.render(feedback, True, RED)
            DISPLAYSURF.blit(feedback_text, (SCREEN_WIDTH // 2 - 100, 60))

        # Show the player's typed input
        input_text = font_small.render(f"Your answer: {user_input}", True, BLACK)
        DISPLAYSURF.blit(input_text, (SCREEN_WIDTH // 2 - 100, 40))

        # Draw all sprites
        for entity in all_sprites:
            DISPLAYSURF.blit(entity.image, entity.rect)

        # If game over, display the winner and stop new questions
        if game_over:
            DISPLAYSURF.blit(winner_text, (SCREEN_WIDTH // 2 - 100, SCREEN_HEIGHT // 2 - 20))
            pygame.display.update()
            for entity in all_sprites:
                entity.kill()  # Stop cars from moving
            time.sleep(2)
            pygame.quit()
            sys.exit()

        pygame.display.update()
        FramePerSec.tick(FPS)

# Home screen for selecting operation and difficulty
def home_screen_loop():
    global home_screen, operation_type, DIFFICULTY, ENEMY_SPEED_RANGE

    while home_screen:
        DISPLAYSURF.fill(WHITE)
        title_text = font.render("Welcome to Math Type Race!", True, BLACK)
        DISPLAYSURF.blit(title_text, (SCREEN_WIDTH // 2 - 300, SCREEN_HEIGHT // 2 - 150))

        add_button = font_small.render("Addition", True, BLUE)
        sub_button = font_small.render("Subtraction", True, BLUE)
        both_button = font_small.render("Both", True, BLUE)

        DISPLAYSURF.blit(add_button, (SCREEN_WIDTH // 2 - 60, SCREEN_HEIGHT // 2 - 60))
        DISPLAYSURF.blit(sub_button, (SCREEN_WIDTH // 2 - 60, SCREEN_HEIGHT // 2))
        DISPLAYSURF.blit(both_button, (SCREEN_WIDTH // 2 - 60, SCREEN_HEIGHT // 2 + 60))

        pygame.display.update()

        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()

            if event.type == MOUSEBUTTONDOWN:
                mouse_pos = pygame.mouse.get_pos()
                if SCREEN_WIDTH // 2 - 60 <= mouse_pos[0] <= SCREEN_WIDTH // 2 + 60:
                    if SCREEN_HEIGHT // 2 - 60 <= mouse_pos[1] <= SCREEN_HEIGHT // 2 - 30:
                        operation_type = "addition"
                        home_screen = False
                    elif SCREEN_HEIGHT // 2 <= mouse_pos[1] <= SCREEN_HEIGHT // 2 + 30:
                        operation_type = "subtraction"
                        home_screen = False
                    elif SCREEN_HEIGHT // 2 + 60 <= mouse_pos[1] <= SCREEN_HEIGHT // 2 + 90:
                        operation_type = "both"
                        home_screen = False

    # After selecting operation, ask for difficulty
    difficulty_selection = True
    while difficulty_selection:
        DISPLAYSURF.fill(WHITE)
        difficulty_text = font.render("Select Difficulty", True, BLACK)
        DISPLAYSURF.blit(difficulty_text, (SCREEN_WIDTH // 2 - 200, SCREEN_HEIGHT // 2 - 100))

        easy_button = font_small.render("Easy", True, BLUE)
        medium_button = font_small.render("Medium", True, BLUE)
        hard_button = font_small.render("Hard", True, BLUE)

        DISPLAYSURF.blit(easy_button, (SCREEN_WIDTH // 2 - 50, SCREEN_HEIGHT // 2 - 30))
        DISPLAYSURF.blit(medium_button, (SCREEN_WIDTH // 2 - 50, SCREEN_HEIGHT // 2))
        DISPLAYSURF.blit(hard_button, (SCREEN_WIDTH // 2 - 50, SCREEN_HEIGHT // 2 + 30))

        pygame.display.update()

        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()

            if event.type == MOUSEBUTTONDOWN:
                mouse_pos = pygame.mouse.get_pos()
                if SCREEN_WIDTH // 2 - 50 <= mouse_pos[0] <= SCREEN_WIDTH // 2 + 50:
                    if SCREEN_HEIGHT // 2 - 30 <= mouse_pos[1] <= SCREEN_HEIGHT // 2:
                        DIFFICULTY = 1  # Easy
                        difficulty_selection = False
                    elif SCREEN_HEIGHT // 2 <= mouse_pos[1] <= SCREEN_HEIGHT // 2 + 30:
                        DIFFICULTY = 2  # Medium
                        difficulty_selection = False
                    elif SCREEN_HEIGHT // 2 + 30 <= mouse_pos[1] <= SCREEN_HEIGHT // 2 + 60:
                        DIFFICULTY = 3  # Hard
                        difficulty_selection = False

    # Update enemy speed range based on difficulty
    ENEMY_SPEED_RANGE = [0, DIFFICULTY]

async def main():
    # Check if the API key was loaded correctly
    if not api_key:
        raise ValueError("LMNT_API_KEY not found. Please make sure it's set in your .env file.")

    # Run home screen to choose math operation and difficulty
    home_screen_loop()

    # After selection, start the game loop
    await game_loop()

asyncio.run(main())