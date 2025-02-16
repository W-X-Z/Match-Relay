import React from 'react';
import Card from './Card';
import { useGameStore } from '../store/gameStore';

const Hand: React.FC = () => {
  const { 
    hand, 
    placeCard, 
    checkGameEnd, 
    isGameOver, 
    hint, 
    initGame, 
    isPlacingCard,
    selectedHandCard
  } = useGameStore();

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-full bg-gray-100 rounded-lg shadow-lg p-2">
          <div className="flex justify-center">
            {hand.map((card, index) => (
              <div 
                key={card.id}
                className={`scale-[0.7] sm:scale-[0.8] -ml-3 first:ml-0 transition-all duration-300
                  ${isGameOver && hint?.handIndex === index
                    ? 'ring-4 ring-green-500'
                    : selectedHandCard === index
                    ? 'ring-4 ring-blue-500'
                    : ''
                  }
                  ${card.isMoving ? 'animate-slide-to-board' : ''}
                `}
              >
                <Card 
                  card={card} 
                  onClick={() => placeCard(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <button 
          onClick={isGameOver ? initGame : checkGameEnd}
          className={`w-full sm:w-48 px-3 py-2 rounded-lg text-white text-sm font-semibold
            ${isGameOver 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-red-500 hover:bg-red-600'}`}
        >
          {isGameOver ? 'Retry' : 'No Match'}
        </button>
      </div>
    </div>
  );
};

export default Hand; 