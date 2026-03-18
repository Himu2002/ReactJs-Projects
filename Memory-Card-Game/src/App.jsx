import { useState, useEffect } from "react";
import { GameHeader } from "./components/gameHeader";
import { Card } from "./components/Card";

const cardValues = [
  "🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥝", "🍉", "🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥝", "🍉"
]

function App() {
  const [cards, setCards] = useState([])

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

  return (
    <>
      <div className="app">
        <GameHeader score={3} moves={10} />

        <div className="cards-grid">
          {cards.map((card) => (
            <Card value={card.value} key={card.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
