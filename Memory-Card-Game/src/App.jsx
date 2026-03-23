import { useState, useEffect } from "react";
import { GameHeader } from "./components/gameHeader";
import { Card } from "./components/Card";

const cardValues = [
  "🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥝", "🍉", "🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥝", "🍉"
]

function App() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])

  const initializeGame = () => {
    //shuffle the cards
    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
  }

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    //Dont flip if already flipped or matched, or if 2 cards are already flipping
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    //Flip the card
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    // Check if two cards are flipped
    if (newFlippedCards.length === 2) {
      const firstCard = newFlippedCards[0];
      const secondCard = newFlippedCards[1];

      // Use a timeout so the 2nd card visually flips before the alert appears
      setTimeout(() => {
        if (firstCard.value === secondCard.value) {
          alert("Match!");
          // Keep them flipped & lock them by setting isMatched: true
        } else {
          alert("No Match!");
        }
        // Clear the flipped array so we can pick 2 new cards
        setFlippedCards([]);
      }, 500);
    }
  }

  return (
    <>
      <div className="app">
        <GameHeader score={3} moves={10} />

        <div className="cards-grid">
          {cards.map((card, index) => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
