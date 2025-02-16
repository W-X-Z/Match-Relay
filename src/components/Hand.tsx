import React from 'react';
import Card from './Card';
import { useGameStore } from '../store/gameStore';

const Hand: React.FC = () => {
  const { hand, placeCard, checkGameEnd, isGameOver, hint } = useGameStore();

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-full bg-gray-100 rounded-lg shadow-lg p-2">
          <div className="flex justify-center">
            {hand.map((card, index) => (
              <div 
                key={card.id}
                className={`scale-[0.7] sm:scale-[0.8] -ml-3 first:ml-0 ${
                  isGameOver && hint?.handIndex === index
                    ? 'ring-4 ring-green-500'
                    : ''
                }`}
              >
                <Card 
                  key={card.id} 
                  card={card} 
                  onClick={() => placeCard(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <button 
          onClick={checkGameEnd}
          disabled={isGameOver}
          className="w-full sm:w-48 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-500 text-sm font-semibold"
        >
          No Match
        </button>
      </div>
    </div>
  );
};

export default Hand; 