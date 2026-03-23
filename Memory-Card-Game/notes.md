# Code Flow: Memory Card Game

When you load your webpage, React follows a specific sequence of steps to put everything on the screen. Let's walk through it in the simplest way possible.

---

### Step 1: The Entry Point (`main.jsx`)
When your application starts, the very first file that runs is `main.jsx`. 
- **What it does:** It looks for an element in your HTML file with the ID `root` (`document.getElementById('root')`) and tells React to "render" or draw your entire application inside it.
- **The Code:** It imports your `App` component and places it inside the React renderer.

---

### Step 2: Setting up the App (`App.jsx`)
Next, React moves to `App.jsx`. This is the main container or the "boss" of your application. Before putting anything on the screen, it prepares the data.

1. **State Initialization:**
   ```javascript
   const [cards, setCards] = useState([])
   ```
   It sets up a state called `cards` holding an empty list (`[]`). Think of state as memory. The app remembers this empty list of cards.

2. **First Render (Drawing the screen):**
   Because `cards` is empty right now, it renders the `GameHeader` (the top part with Score and Moves), but the `cards-grid` area is drawn empty because there are no cards yet.

3. **Running `useEffect` (Loading the cards):**
   ```javascript
   useEffect(() => {
     initializeGame();
   }, []);
   ```
   After the screen is drawn for the first time, React notices the `useEffect`. Because it has an empty bracket `[]` at the end, it says: "Run `initializeGame()` exactly *once* after the app starts."

---

### Step 3: Preparing the Cards (`initializeGame` in `App.jsx`)
Inside the `initializeGame()` function, the app creates the cards:
- It takes a list of emojis (`cardValues`).
- It loops through them (`.map`) to create a detailed "Profile" for each card. Every card becomes an object holding:
  - `id`: Its position.
  - `value`: The actual emoji (like 🍎 or 🍌).
  - `isFlipped`: A boolean (false) meaning it's facing down.
  - `isMatched`: A boolean (false) meaning it hasn't been solved yet.
- Finally, it calls `setCards(finalCards)`. This updates the app's memory with the newly created cards.

---

### Step 4: Redrawing the Screen (`App.jsx` + Components)
Because `setCards` changed the app's memory, React says, "Wait! The data changed. I need to redraw the screen!"

Now it goes down to the `return` statement in `App.jsx` and draws the items one by one:

1. **The Header (`components/gameHeader.jsx`):**
   ```javascript
   <GameHeader score={3} moves={10} />
   ```
   It calls the `GameHeader` component, passing a hardcoded `score` of 3 and `moves` of 10. `GameHeader.jsx` takes these numbers and creates the HTML for the title and the stats text.

2. **The Cards Grid (`components/Card.jsx`):**
   ```javascript
   <div className="cards-grid">
     {cards.map((value, index) => (
       <Card value={value} index={index} />
     ))}
   </div>
   ```
   React goes through the `cards` list we just built. For every card in the list, it calls the `Card` component. 

3. **Drawing Individual Cards (`components/Card.jsx`):**
   In `Card.jsx`, the code receives the card data (passed as `value` and `index`).
   It creates a container with two sides:
   - `<div className="card-front">?</div>` draws the front of the card showing a Question Mark.
   - `<div className="card-back">{value}</div>` draws the back of the card intended to show the emoji. 
   *(Note: Right now `value` is being passed as an entire object from App.jsx, which you will eventually want to read as `value.value` to get the actual emoji).*

---

### Summary of What You See:
1. **`main.jsx`** starts the app.
2. **`App.jsx`** sets up variables and immediately creates the card objects using `useEffect`.
3. **`App.jsx`** then draws the overall layout.
4. **`gameHeader.jsx`** is responsible for the top section showing "Memory Card Game", "Score", and "Moves".
5. **`Card.jsx`** is responsible for drawing every single box/card you see in the grid area with the "?" on it.
