import React, { useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Hand from './components/Hand';
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
      <Hand />
      <GameOverModal />
    </div>
  );
};

export default App; 