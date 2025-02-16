import React from 'react';
import { useGameStore } from '../store/gameStore';

const GameOverModal: React.FC = () => {
  const { isGameOver, gameOverReason, score, initGame } = useGameStore();

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-lg text-center w-full max-w-md mx-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">게임 종료!</h2>
        <p className="text-base sm:text-lg mb-3 sm:mb-4">{gameOverReason}</p>
        <p className="text-lg sm:text-xl mb-4 sm:mb-6">최종 점수: {score}</p>
        <button
          onClick={initGame}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          다시 시작
        </button>
      </div>
    </div>
  );
};

export default GameOverModal; 