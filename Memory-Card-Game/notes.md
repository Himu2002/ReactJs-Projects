# Code Flow: Memory Card Game (Explained Simply!)

Imagine React is a super fast artist drawing a picture. When you load your webpage, React follows a specific sequence of steps to put everything on the screen. Let's walk through it in the simplest way possible, as if we are explaining it to a 6-year-old!

---

### Step 1: Waking Up the Artist (`main.jsx`)
When your game opens, the very first thing that wakes up is `main.jsx`. 
- **What it does:** It looks for a big blank canvas (in your HTML file, called `root`), and tells React, "Hey! Start drawing the game here!"

---

### Step 2: Setting up the Master Plan (`App.jsx`)
Next, React goes to `App.jsx`. Think of this as the main boss of the game. Before drawing *anything*, the boss sets up its "memory" (React calls this `state`).

1. **The Game's Memory (State):**
   The game needs to constantly remember a few things:
   - `cards`: The list of all the picture cards.
   - `flippedCards`: The cards you are currently looking at.
   - `matchedCards`: The pairs you already found!
   - `score`: How many matches you found.
   - `moves`: How many times you tried flipping cards.

2. **First Drawing (First Render):**
   Because the game just started, the memory is mostly empty (0 score, 0 moves, no cards). The artist quickly draws the top part (`GameHeader`) with 0 score, but the card board is completely empty!

3. **Starting the Game (`useEffect`):**
   Right after drawing the empty board, React notices an instruction called `useEffect()`. It says: "Wait! Go run the `initializeGame()` function to prepare the real game, just once!"

---

### Step 3: Mixing and Dealing the Cards (`initializeGame` in `App.jsx`)
Inside `initializeGame()`, the boss does the actual work:
- It takes our list of simple emojis (like 🍎 and 🍌).
- It shuffles them randomly so the game is different every time!
- It creates a special profile for each card:
  - `id`: The card's lucky number.
  - `value`: The emoji on the card.
  - `isFlipped`: Is it hiding? (Starts as false)
  - `isMatched`: Did we win this one? (Starts as false)
- It resets your Score and Moves back to 0.
- Finally, it puts these shuffled cards into the game's `cards` memory.

---

### Step 4: Redrawing the Screen (`App.jsx` + Components)
Because the `cards` memory just changed from empty to full of shuffled cards, the artist shouts: "Wait! The memory changed! I need to redraw!"

1. **The Top Bar (`components/gameHeader.jsx`):**
   The boss passes the current `score` and `moves` to the `GameHeader`. The header draws "Score: 0" and "Moves: 0".

2. **Drawing the Cards Grid (`components/Card.jsx`):**
   The boss goes through all our shuffled cards one by one. For every card, it asks the `Card.jsx` file to draw a square box on the screen. 
   - If the card's profile says `isFlipped` is true, it draws the emoji.
   - If `isFlipped` is false, it just draws a simple "?".
   - If `isMatched` is true, the box gets a special green color to show you solved it!

---

### Step 5: Playing the Game! (`handleCardClick` in `App.jsx`)
This is the most fun part. What happens when you actually click a card?

1. **Checking the Rules:** First, the game checks if the card is already facing up, or if you already won it. If yes, it ignores your click.
2. **Flipping It:** It updates the memory to say `isFlipped: true` for that card. The artist instantly redraws that single card so you can see the emoji.
3. **Did you flip two cards?** The game checks if this is your second guess. If it is:
   - It adds **+1 to your Moves**.
   - It looks at both emojis. 
   - **If they are the same:** YAY! It adds **+1 to your Score**, and sets `isMatched: true` for both cards. The artist redraws them and they turn light green!
   - **If they are different:** Awww! It waits for exactly 1 second so you can see your mistake, and then quickly changes their `isFlipped` back to `false`. The artist redraws them hiding their faces again.

And that cycle keeps going until you match them all!
