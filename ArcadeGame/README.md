# Snake with Portals

## Overview
This is a classic **Snake game** implemented in HTML, CSS, and JavaScript, with a fun twist: **portals** that teleport the snake between two locations. The game is simple but challenging and adds a creative portal mechanic for added excitement.   
As per the challenge's instructions it was created in less than 150 lines of code. To be more specific it was written in 123 lines (14 HTML, 97 JS, 12 CSS)

---

## Features
- **Classic Snake Gameplay**: Control the snake with arrow keys and grow longer as you eat food.  
- **Portals**: Two blue blocks appear after 15 seconds. The snake can enter **either portal** and instantly teleport to the other.  
- **Score Tracking**: Current score is displayed and updated in real-time.  
- **High Score**: Your highest score is stored in the browser and persists between sessions.  
- **Game Over Banner**: When the snake collides with itself or the edge, a banner appears showing your score and high score. Press **Enter** or click OK to restart.  

---

## How to Play
1. **Clone the repository** to your local machine.  
2. Open the project folder in **VS Code**.  
3. Run `snake.html` using the **Live Server** extension.  
4. Use the **arrow keys** to move the snake:  
   - Up: ↑  
   - Down: ↓  
   - Left: ←  
   - Right: →  
5. Eat the red food to grow and increase your score.  
6. After 15 seconds, **two blue portals** appear:  
   - Entering one portal will instantly teleport the snake to the other.  
7. Avoid hitting the walls or your own body.  
8. When the game ends, press **Enter** or click OK to restart.  

---

## Files
- `index.html` – The main HTML file with the canvas and game interface.  
- `snake.js` – JavaScript file containing all game logic.  
- `snake.css` – CSS styling for the game board, snake, portals, and Game Over banner.  
---
