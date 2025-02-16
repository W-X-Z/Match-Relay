import React, { useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import { useGameStore } from './store/gameStore';

const App: React.FC = () => {
  const initGame = useGameStore(state => state.initGame);

  useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <div className="relative">
      <GameBoard />
      <GameOverModal />
    </div>
  );
};

export default App; 