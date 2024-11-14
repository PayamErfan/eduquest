import pygame
SCREEN_WIDTH = 1550
pause_img = pygame.image.load('pause.png')
pause_img = pygame.transform.scale(pause_img, (40, 40))  # Resize to 40x40 pixels
pause_rect = pause_img.get_rect(topright=(SCREEN_WIDTH - 80, 20))
