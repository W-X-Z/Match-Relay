import React, { useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { useGameStore } from './store/gameStore';

const App: React.FC = () => {
  const initGame = useGameStore(state => state.initGame);

  useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <div className="relative">
      <GameBoard />
    </div>
  );
};

export default App; 