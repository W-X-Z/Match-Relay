import React from 'react';
import Card from './Card';
import { useGameStore } from '../store/gameStore';

const GameBoard: React.FC = () => {
  const { board, score, selectedCards, selectCard, hint, isGameOver } = useGameStore();
  const lastFiveCards = board.slice(-5);

  return (
    <div className="w-full min-h-screen bg-gray-200 p-8">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">점수: {score}</h1>
        <p className="text-sm text-gray-600 mt-2">
          {selectedCards.length < 2 ? '비교할 카드 2개를 선택하세요' : '손패에서 카드를 선택하세요'}
        </p>
      </div>
      <div className="flex gap-4 justify-center items-center min-h-[200px]">
        {lastFiveCards.map((card, index) => {
          const boardIndex = board.length - 5 + index;
          const isHinted = hint?.boardIndices.includes(boardIndex);
          
          return (
            <div 
              key={card.id}
              className={`relative ${
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
    </div>
  );
};

export default GameBoard; 