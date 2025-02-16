import React, { useState } from 'react';
import Card from './Card';
import HelpModal from './HelpModal';
import { useGameStore } from '../store/gameStore';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Hand from './Hand';

const GameBoard: React.FC = () => {
  const { board, score, selectedCards, selectCard, hint, isGameOver } = useGameStore();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const lastFiveCards = board.slice(-5);

  return (
    <div className="w-full min-h-screen bg-gray-200 p-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Match Relay</h1>
          <div className="flex items-center gap-2">
            <div className="text-base sm:text-lg font-semibold">Score: {score}</div>
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              <QuestionMarkCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            {lastFiveCards.map((card, index) => {
              const boardIndex = board.length - 5 + index;
              const isHinted = hint?.boardIndices.includes(boardIndex);
              
              return (
                <div 
                  key={card.id}
                  className={`relative scale-[0.7] sm:scale-[0.8] -ml-3 first:ml-0 ${
                    selectedCards.includes(boardIndex)
                      ? 'ring-4 ring-blue-500'
                      : isHinted && isGameOver
                      ? 'ring-4 ring-green-500'
                      : ''
                  }`}
                  onClick={() => selectCard(boardIndex)}
                >
                  <Card card={card} />
                </div>
              );
            })}
          </div>
          
          <Hand />
        </div>
      </div>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default GameBoard; 