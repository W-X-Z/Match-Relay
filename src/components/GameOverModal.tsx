import React from 'react';
import { useGameStore } from '../store/gameStore';

const GameOverModal: React.FC = () => {
  const { isGameOver, gameOverReason, score, initGame } = useGameStore();

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">게임 종료!</h2>
        <p className="text-lg mb-4">{gameOverReason}</p>
        <p className="text-xl mb-6">최종 점수: {score}</p>
        <button
          onClick={initGame}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          다시 시작
        </button>
      </div>
    </div>
  );
};

export default GameOverModal; 