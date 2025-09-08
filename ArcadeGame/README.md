# 🐍Vortex Viper🐍

## Overview
**Vortex Viper** is a classic *Snake game* implemented in **HTML, CSS, and JavaScript** with a fun sci-fi twist:  
blue **vortices (portals)** appear after a short time, teleporting the snake between two locations.  

The game is simple but challenging, adding a creative warp mechanic for extra excitement.  

As per the challenge’s rules, the entire project was created in under **150 lines of code**:  
- **123 total lines** (14 HTML, 88 JavaScript, 21 CSS).  

---

## Features
- **Classic Snake Gameplay**  
  Control the snake with the arrow keys and grow longer as you eat food.  

- **Vortices (Portals)**  
  After 5 seconds, two glowing blue vortices appear. Entering one instantly teleports the snake to the other.  
  The vortices then relocate to random positions, keeping gameplay dynamic.  

- **Score Tracking**  
  Your current score updates in real-time.  

- **High Score**  
  The game stores your highest score locally, persisting between browser sessions.  

- **Game Over Banner**  
  Collide with yourself or a wall, and a banner appears showing your score and high score.  
  Press **Enter** or click **OK** to restart.  

- **Fun Twist**  
  If food disappears, don’t panic—it’s simply in another universe.  
  Slip through a vortex to track it down!  

---

## How to Play
1. **Clone the repository** to your local machine.  
2. Open the `index.html` file in your browser.  
3. Use the **arrow keys** to move the snake:  
   - Up: ↑  
   - Down: ↓  
   - Left: ←  
   - Right: →  
4. Eat the red food to grow and increase your score.  
5. After 5 seconds, two blue **vortices (portals)** appear:  
   - Entering one vortex instantly warps you to the other.  
6. Avoid hitting the walls or your own body.  
7. When the game ends, press **Enter** or click **OK** to restart.  

If it is not working by opening the html file open the project in VS Code and run the html with the Live Server extension.
---

## Files
- `index.html` – Main HTML file containing the game canvas and UI.  
- `snake.js` – JavaScript file containing all game logic.  
- `snake.css` – CSS styling for the snake, food, vortices, and banner.  
- `jungle.jpg` – Background image.  

Background image source:  
[The Jungle of Chiapas – Pixabay](https://pixabay.com/photos/the-jungle-of-chiapas-1865639)  

---
