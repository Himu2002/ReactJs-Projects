
export const Card = ({ card, onCardClick }) => {
    // If the card is flipped or matched, we add those classes to the element
    // The 'flipped' class shows the front of the card
    // The 'matched' class makes it light green and unclickable
    return (
        <div 
            className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`} 
            onClick={() => onCardClick(card)}
        >
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
        </div>
    )
}