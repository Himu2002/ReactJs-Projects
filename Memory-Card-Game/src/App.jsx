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

      setTimeout(() => {

        // Not a match! Flip back those two specific cards
        const flippedBackCards = newCards.map((c) => {
          if (c.id === firstCard.id || c.id === card.id) {
            return { ...c, isFlipped: false };
          } else {
            return c;
          }
        });
        setCards(flippedBackCards);
      }, 1000); // 1-second delay so the player can see the cards
    }
  }; // <-- This closing bracket was missing!

  return (
    <>
      <div className="app">
        <GameHeader score={3} moves={10} />

        <div className="cards-grid">
          {cards.map((card) => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
