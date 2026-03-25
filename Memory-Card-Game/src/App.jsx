import { useState, useEffect } from "react";
import { GameHeader } from "./components/gameHeader";
import { Card } from "./components/Card";

const cardValues = [
  "🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥝", "🍉", "🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥝", "🍉"
]

function App() {
  // --- APP STATE (THE APP'S MEMORY) ---
  // 'cards' stores the list of all card objects in the game.
  const [cards, setCards] = useState([])
  
  // 'flippedCards' stores the IDs (index numbers) of the cards currently flipped face-up.
  const [flippedCards, setFlippedCards] = useState([])
  
  // 'matchedCards' stores the IDs of cards that have already been matched to keep them permanently up.
  const [matchedCards, setMatchedCards] = useState([])
  
  // 'score' keeps track of how many pairs the player has matched correctly.
  const [score, setScore] = useState(0)
  
  // 'moves' keeps track of how many times the player flips two cards (whether they match or not).
  const [moves, setMoves] = useState(0)

  // This function sets up a brand new game
  const initializeGame = () => {
    // We map over our core card values (the emojis) and create a full object for each card
    const finalCards = cardValues.map((value, index) => ({
      id: index,               // The unique position of the card
      value,                   // The emoji symbol
      isFlipped: false,        // Is the card currently facing up? (Starts false)
      isMatched: false,        // Has this card been solved? (Starts false)
    }));

    // First, let's reset our stats and state for a fresh game start
    setScore(0);
    setMoves(0);
    setFlippedCards([]);
    setMatchedCards([]);

    // We shuffle the cards so every game is a new puzzle!
    finalCards.sort(() => Math.random() - 0.5); 

    // Put our prepared cards into the App's memory (state)
    setCards(finalCards);
  }

  // When the app first loads, we run initializeGame exactly one time.
  useEffect(() => {
    initializeGame();
  }, []);

  // This function is triggered whenever a user clicks on any single Card
  const handleCardClick = (card) => {
    // RULE 1: Don't do anything if the card is already facing up (flipped).
    // RULE 2: Don't do anything if the card is already solved (matched).
    // RULE 3: Don't let the user click a 3rd card when 2 cards are already flipping.
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    // We make a copy of all our cards, and if we find the one that was just clicked,
    // we change 'isFlipped' to true (meaning it faces up).
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    // Update the app's memory with this new list of flipped cards
    setCards(newCards);

    // We track the ID of the clicked card into our 'flippedCards' memory array
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // Now, we check: Did the user just flip over their SECOND card in a turn?
    if (newFlippedCards.length === 2) {
      // 1 move has been completed because they flipped two cards
      setMoves((prevMoves) => prevMoves + 1);

      // Let's grab the actual full Objects of the two cards they flipped
      const firstCardId = newFlippedCards[0];
      const secondCardId = newFlippedCards[1];
      const firstCardObj = newCards.find(c => c.id === firstCardId);
      const secondCardObj = newCards.find(c => c.id === secondCardId);

      // Checking if the emojis of both cards are exactly the same!
      if (firstCardObj.value === secondCardObj.value) {
        // MATCH YAY!
        // Increment the player's score by 1
        setScore((prevScore) => prevScore + 1);
        
        // Save the IDs of the matched cards to our memory
        setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);

        // Go through our cards and update those two specific cards to say 'isMatched: true'
        // Because of the edit we did in Card.jsx, this will instantly make them light green!
        const newMatchedCards = newCards.map(c =>
          c.id === firstCardId || c.id === secondCardId ? { ...c, isMatched: true } : c
        );
        // Save to memory
        setCards(newMatchedCards);
        
        // We clear the currently "flipping" cards because we are done with this turn
        setFlippedCards([]);
      } else {
        // NOT A MATCH AWWW!
        // We wait for 1 second (1000 milliseconds) so the user can look at their mistake.
        setTimeout(() => {
          // After 1 second, we flip those exact two cards back face-down (isFlipped: false)
          setCards(prevCards => prevCards.map((c) => {
            if (c.id === firstCardId || c.id === secondCardId) {
              return { ...c, isFlipped: false };
            } else {
              return c; // leave other cards exactly as they are
            }
          }));
          // We clear the currently "flipping" cards because we are done with this turn
          setFlippedCards([]);
        }, 1000); 
      }
    }
  };

  // This is the actual HTML drawing part of our app.
  return (
    <>
      <div className="app">
        {/* We pass our real, living score and moves data to the GameHeader! */}
        <GameHeader score={score} moves={moves} />

        <div className="cards-grid">
          {/* We loop through all our memory cards and draw an actual <Card /> component for each one */}
          {cards.map((card) => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
