import React from 'react';
import Card from './Card';
import { useGameStore } from '../store/gameStore';

const Hand: React.FC = () => {
  const { hand, placeCard, checkGameEnd, isGameOver, hint } = useGameStore();

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
          {hand.map((card, index) => (
            <div 
              key={card.id}
              className={`${
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
        <button 
          onClick={checkGameEnd}
          disabled={isGameOver}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
        >
          결
        </button>
      </div>
    </div>
  );
};

export default Hand; 