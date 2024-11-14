import pygame, random, os, asyncio, sys, concurrent.futures
from pygame.locals import *
from pygame import mixer
from lmnt.api import Speech
from dotenv import load_dotenv
from pydub import AudioSegment

# Load environment variables and initialize modules
load_dotenv()
pygame.init()
mixer.init()

api_key = os.getenv('LMNT_API_KEY')

# Screen settings
SCREEN_WIDTH, SCREEN_HEIGHT = 500, 350
DISPLAYSURF = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
font = pygame.font.SysFont("Verdana", 48)
small_font = pygame.font.SysFont("Verdana", 30)
clock = pygame.time.Clock()

# Colors
BLUE, RED, WHITE, BLACK, GREEN = (0, 0, 255), (255, 0, 0), (255, 255, 255), (0, 0, 0), (0, 255, 0)

# Game Variables
PLAYER_MOVE_AMOUNT = 150
FINISH_LINE = SCREEN_WIDTH - 200
DIFFICULTY = 1
digits = "1-10"
AUDIO_ON = True  # Set to True if you want audio

# Assets
race_track = pygame.image.load('racetrack.png')
player_img = pygame.image.load('red_car.png')
opp_img = pygame.image.load('blue_car.png')
pause_img = pygame.image.load('pause.png')
pause_img = pygame.transform.scale(pause_img, (40, 40))  # Resize to 40x40 pixels
pause_rect = pause_img.get_rect(topright=(SCREEN_WIDTH - 80, 20))

# Audio channels
question_channel = pygame.mixer.Channel(1)  # Dedicated to question audio
sound_effect_channel = pygame.mixer.Channel(2)  # Dedicated to sound effects


# Fonts
font = pygame.font.SysFont("Verdana", 40)
font_small = pygame.font.SysFont("Verdana", 20)
winner_text = font.render("", True, BLACK)

# Game States
home_screen = True
operation_type = None  # This will store "addition", "subtraction", or "both"
digit_type = None
game_over = False
paused = False

# Initialize a ThreadPoolExecutor
executor = concurrent.futures.ThreadPoolExecutor(max_workers=1)

# CLASSES
class Button:
    def __init__(self, name, x_pos, y_pos, width=300, height=100):
        self.name = name
        self.x_pos, self.y_pos = x_pos, y_pos
        self.width, self.height = width, height
        self.surface = pygame.Surface((300, 100))
        self.surface.fill((235, 216, 189))
        self.rect = pygame.Rect(x_pos, y_pos, 300, 100)
        self.surface_rect = self.surface.get_rect(topleft=(self.x_pos, self.y_pos))

    def create_text(self):
        # Render the text on top of the button surface
        text = font.render(self.name, True, (0, 0, 0), (235, 216, 189))
        text_rect = text.get_rect(center=(self.surface.get_width()/2, self.surface.get_height()/2))
        self.surface.blit(text, text_rect)

    def render(self, screen, text=""):
        # Clear the surface before re-rendering the text
        self.surface.fill((235, 216, 189))
        # Render the text on top of the button surface
        button_text = font.render(f"{text or self.name}", True, BLACK)
        text_rect = button_text.get_rect(center=(self.width / 2, self.height / 2))
        self.surface.blit(button_text, text_rect)
        # Display the button on the screen
        screen.blit(self.surface, (self.x_pos, self.y_pos))



class Question(Button):
    # size 600x100
    surface = pygame.image.load('question.png')

    def __init__(self, text, x_pos, y_pos):
        super().__init__(text, x_pos, y_pos)  # Use text as name
        self.create_text()  # Create text on initialization

    def create_text(self):
        text_surface = font.render(self.name, True, (0, 0, 0), (235, 216, 189))
        text_rect = text_surface.get_rect(center=(self.surface.get_width()/2, self.surface.get_height()/2))
        self.surface.blit(text_surface, text_rect)



# HELPER FUNCTIONS

# def generate_and_play_audio():
async def _generate_audio(question_text):
    async with Speech(api_key=api_key) as speech:
        synthesis = await speech.synthesize(question_text, 'lily')
    audio_filename = f"question.mp3"
    with open(audio_filename, 'wb') as f:
         f.write(synthesis['audio'])
        # mixer.music.load("question.mp3")
        # mixer.music.play()

        # mp3 = pygame.mixer.Sound(audio_filename)
        # mp3.play()
        
        # Load and play question audio on question_channel
    question_audio = pygame.mixer.Sound(audio_filename)
    question_channel.play(question_audio)

    # Run the async function _generate_audio in the event loop

async def generate_question(operation_type):
    global game_over, isdouble  # Access global game state
    if game_over:     # Avoid question generation if the game is over
        return None, None
    isdouble = digits == "1-100"
    if isdouble:
        num1, num2 = random.randint(10, 49), random.randint(10, 50)
    else:
        num1, num2 = random.randint(1, 5), random.randint(1, 5)
    def addition():
        question = f"{num1} + {num2}?"
        lmnt_text = f"{num1} + {num2}?"
        answer = num1 + num2
        return question, answer, lmnt_text

    def subtraction():
        question = f"{max(num1, num2)} - {min(num1, num2)} = ?"
        lmnt_text = f"{max(num1, num2)} minus {min(num1, num2)}?"
        answer = max(num1, num2) - min(num1, num2)
        return question, answer, lmnt_text
    
    if operation_type == "addition":
        question_text, correct_answer, lmnt_text = addition()
    elif operation_type == "subtraction":
        question_text, correct_answer, lmnt_text = subtraction()
    else:
        question_text, correct_answer, lmnt_text = random.choice([addition, subtraction])()

    # Handle audio generation in a background thread only if the game is not over
    if AUDIO_ON and not game_over:
        await _generate_audio( lmnt_text)
    
    return question_text, correct_answer

def generate_buttons(question_text, correct_answer):
    question_btn = Question(question_text, 625, 25)

    answer_btn_positions = [(375, 135), (875, 135), (375, 250), (875, 250)]
    answer_btns = [Button(i, x, y) for i, (x, y) in enumerate(answer_btn_positions, 1)]
    answer_options = [correct_answer, correct_answer + 1, correct_answer - 1, correct_answer + 2]
    random.shuffle(answer_options)  # randomize answer button
    # dictionary with key as button and value as the text it should hold
    answer_btns_dict = {b: a for b, a in zip(answer_btns, answer_options)}

    return question_btn, answer_btns_dict


async def game_loop():
    global game_over, home_screen, operation_type, DIFFICULTY, paused, isdouble, digits

    player_x_pos, opp_x_pos = 60, 40
    feedback = ""
    target_x_pos = player_x_pos
    is_moving = False
    question_text, correct_answer = await generate_question(operation_type)
    question_btn, answer_btns_dict = generate_buttons(question_text, correct_answer)

    play_again_btn = Button("Play Again", SCREEN_WIDTH // 2 - 300, SCREEN_HEIGHT // 2 - 150)
    exit_btn = Button("Exit", SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 150)
    resume_btn = Button("Resume", 0, 0)  # Initial positions; will be updated for pause menu
    exit_pause_btn = Button("Exit", 0, 0)
    pause_rect = pause_img.get_rect(topright=(SCREEN_WIDTH - 80, 20))

    # Resize button surfaces for pause menu
    resume_btn.surface = pygame.Surface((300, 75))
    exit_pause_btn.surface = pygame.Surface((300, 75))

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if game_over:
                    if play_again_btn.rect.collidepoint(event.pos):
                        game_over, home_screen, operation_type, DIFFICULTY = False, True, None, 1
                        isdouble = None
                        digits = "1-10"
                        await main()
                    elif exit_btn.rect.collidepoint(event.pos):
                        pygame.quit()
                        sys.exit()
                elif pause_rect.collidepoint(event.pos):
                    paused = True
                elif paused:
                    # Check if buttons within the pause menu are clicked
                    if resume_btn.rect.collidepoint(event.pos):
                        paused = False
                    elif exit_pause_btn.rect.collidepoint(event.pos):
                        pygame.quit()
                        sys.exit()
                elif not paused:
                    for btn in answer_btns_dict.keys():
                        if btn.rect.collidepoint(event.pos):
                            if answer_btns_dict[btn] == correct_answer:
                                if player_x_pos + PLAYER_MOVE_AMOUNT >= FINISH_LINE:
                                    target_x_pos = FINISH_LINE
                                    is_moving, game_over = True, True
                                    feedback = "Player Wins!"
                                else:
                                    target_x_pos = player_x_pos + PLAYER_MOVE_AMOUNT
                                    is_moving, feedback = True, ""
                                    
                                    # Play sound effect when player moves forward
                                    car_passing_sound = pygame.mixer.Sound('car-passing.mp3')
                                    sound_effect_channel.play(car_passing_sound)
                                    
                                    question_text, correct_answer = await generate_question(operation_type)
                                    question_btn, answer_btns_dict = generate_buttons(question_text, correct_answer)
                                break
                            else:
                                btn.visible = False
                                feedback = "Incorrect! Try again."

        if not game_over and not paused:
            if is_moving:
                player_x_pos = min(player_x_pos + 10, target_x_pos)
                if player_x_pos >= target_x_pos:
                    player_x_pos, is_moving = target_x_pos, False
            opp_x_pos += DIFFICULTY
            if opp_x_pos >= FINISH_LINE:
                game_over, feedback = True, "Opponent Wins!"

        # Draw game screen components
        screen.blit(race_track, (0, 0))
        screen.blit(opp_img, (opp_x_pos, 535))
        screen.blit(player_img, (player_x_pos, 587))
        screen.blit(pause_img, pause_rect)

        if not game_over:
            question_btn.create_text()
            screen.blit(question_btn.surface, (question_btn.x_pos, question_btn.y_pos))
            for btn in answer_btns_dict.keys():
                btn.render(screen, text=str(answer_btns_dict[btn]))

        # feedback_surface = small_font.render(feedback, True, RED if feedback == "Incorrect! Try again." else GREEN)
        # screen.blit(feedback_surface, (700, 200))
        
        if "Player Wins!" or "Try Again." in feedback:
            text_height, text_width = 0, 0
            if "Player Wins!" in feedback:
                text_width = SCREEN_WIDTH // 2 - 130
                text_height = SCREEN_HEIGHT // 2 - 235
                pygame.draw.rect(screen, (235, 216, 189), pygame.Rect(575, text_height - 30, 400, 100))
                feedback_surface = font.render(feedback, True, GREEN)
            elif "Opponent Wins" in feedback:
                text_width = SCREEN_WIDTH // 2 - 160
                text_height = SCREEN_HEIGHT // 2 - 235
                pygame.draw.rect(screen, (235, 216, 189), pygame.Rect(575, text_height - 30, 400, 100))
                feedback_surface = font.render(feedback, True, RED)
            else:
                text_width = SCREEN_WIDTH // 2 - 150
                text_height = SCREEN_HEIGHT // 2 - 8
                feedback_surface = small_font.render(feedback, True, RED)

            screen.blit(feedback_surface, (text_width, text_height))

        # Game Over Screen
        if game_over:
            # screen.blit(winner_text, (SCREEN_WIDTH//2 - winner_text.get_width()//2, SCREEN_HEIGHT//2 - winner_text.get_height()//2))
            play_again_btn.render(screen)
            exit_btn.render(screen)

        # Pause Menu
        elif paused:
            # Center the pause menu box and content
            pause_box_width, pause_box_height = 800, 300
            pause_box_x = (SCREEN_WIDTH - pause_box_width) // 2
            pause_box_y = (SCREEN_HEIGHT - pause_box_height) // 2
            pygame.draw.rect(screen, WHITE, (pause_box_x, pause_box_y, pause_box_width, pause_box_height))
            pygame.draw.rect(screen, BLACK, (pause_box_x, pause_box_y, pause_box_width, pause_box_height), 5)

            # Render "Game Paused" title
            paused_text_surface = font.render("Game Paused", True, BLACK)
            paused_text_x = SCREEN_WIDTH // 2 - paused_text_surface.get_width() // 2
            paused_text_y = pause_box_y + 30
            screen.blit(paused_text_surface, (paused_text_x, paused_text_y))

            # Set Resume and Exit button positions
            resume_btn.x_pos = pause_box_x + (pause_box_width - resume_btn.width) // 2
            resume_btn.y_pos = pause_box_y + 100
            resume_btn.rect.topleft = (resume_btn.x_pos, resume_btn.y_pos)

            exit_pause_btn.x_pos = pause_box_x + (pause_box_width - exit_pause_btn.width) // 2
            exit_pause_btn.y_pos = pause_box_y + 180
            exit_pause_btn.rect.topleft = (exit_pause_btn.x_pos, exit_pause_btn.y_pos)

            # Render buttons in pause menu with text
            resume_btn.render(screen, text="Resume")
            exit_pause_btn.render(screen, text="Exit")
        pygame.display.update()
        clock.tick(30)



def menu():
    global home_screen, operation_type, DIFFICULTY, digits

    race_track = pygame.image.load('racetrack.png')  # Background image
    player = pygame.image.load('red_car.png')
    player_x_pos = 60
    opp = pygame.image.load('blue_car.png')
    opp_x_pos = 40
    font = pygame.font.SysFont("Verdana", 48)

    buttonQ = Question('START', 575, 225)
    buttons = [buttonQ]

    digit_buttons = [
        Button('1-10', 440,150),
        Button('1-100', 800,150)
    ]

    difficulty_buttons = [
        Button('Easy', 150, 150),
        Button('Medium', 570, 150),
        Button('Hard', 990, 150)
    ]

    question_buttons = [
        Button('Addition', 150, 150),
        Button('Subtraction', 570, 150),
        Button('Both', 990, 150)
    ]

    game_state = 'menu'  # Track current state

    while home_screen:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if game_state == 'menu':
                    for button in buttons:
                        if button.surface_rect.collidepoint(event.pos):
                            game_state = 'difficulty'  # Switch to difficulty selection
                elif game_state == 'difficulty':
                    for button in difficulty_buttons:
                        if button.surface_rect.collidepoint(event.pos):
                            if button.name == "Easy":
                                DIFFICULTY = 1
                            elif button.name == "Medium":
                                DIFFICULTY = 2
                            else:
                                DIFFICULTY = 3
                            game_state = 'questions'  # Switch to question selection
                elif game_state == 'questions':
                    for button in question_buttons:
                        if button.surface_rect.collidepoint(event.pos):
                            operation_type = button.name.lower()
                    game_state = 'digit_type'
                            # home_screen = False
                elif game_state == 'digit_type':
                    for button in digit_buttons:
                        if button.surface_rect.collidepoint(event.pos):
                            if button.name == "1-10":
                                digits = "1-10"
                            elif button.name == "1-100":
                                digits = "1-100"
                            game_state = 'countdown'

        # Draw background
        screen.blit(race_track, (0, 0))

        # Render based on the current state
        if game_state == 'menu':
            screen.blit(opp, (opp_x_pos, 535))
            screen.blit(player, (player_x_pos, 587))

            # Render the title text above the START button
            title_text = font.render("Formula 1 + 1", True, (0, 0, 0))
            title_text_x = buttonQ.x_pos + (buttonQ.width // 2 - title_text.get_width() // 2)
            title_text_y = buttonQ.y_pos - title_text.get_height() - 20  # Position it above the button
            screen.blit(title_text, (title_text_x, title_text_y))

            for button in buttons:
                button.create_text()
                screen.blit(button.surface, (button.x_pos, button.y_pos))

        elif game_state == 'difficulty':
            for button in difficulty_buttons:
                button.create_text()
                screen.blit(button.surface, (button.x_pos, button.y_pos))

        elif game_state == 'questions':
            for button in question_buttons:
                button.create_text()
                screen.blit(button.surface, (button.x_pos, button.y_pos))

        elif game_state == 'digit_type':
            for button in digit_buttons:
                button.create_text()
                screen.blit(button.surface, (button.x_pos, button.y_pos))


        elif game_state == 'countdown':
            # Countdown sequence over 3 seconds
            font = pygame.font.Font(None, 300)  # Choose font and size
            for count in range(3, 0, -1):
                screen.blit(race_track, (0, 0))  # Clear the screen with the background
                text = font.render(str(count), True, (255, 0, 0))  # Red color for countdown
                
                # Center horizontally but raise the text higher on the screen
                text_x = screen.get_width() // 2 - text.get_width() // 2
                text_y = screen.get_height() // 2 - text.get_height() // 2 - 200  # Adjust -100 as needed to move it higher
                
                screen.blit(text, (text_x, text_y))
                pygame.display.update()
                pygame.time.delay(1000)  # Show each number for 1 second
            home_screen = False  # End the menu loop after countdown completes
        pygame.display.update()
        clock.tick(60)

async def main():
    # Check if the API key was loaded correctly
    if not api_key:
        raise ValueError("LMNT_API_KEY not found. Please make sure it's set in your .env file.")

    # Start background music
    mixer.music.load('moonlightdrive.mp3')
    mixer.music.set_volume(0.2)  # Adjust volume as needed
    mixer.music.play(-1)  # Play in an infinite loop

    # Run home screen to choose math operation and difficulty
    menu()

    # After selection, start the game loop
    await game_loop()
