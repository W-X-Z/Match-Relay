import React from 'react';
import { Card as CardType } from '../types/types';

interface CardProps {
  card: CardType;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  // 노란색을 더 진한 색상으로 변경
  const shapeColor = card.shapeColor === 'yellow' ? '#FFD700' : card.shapeColor;

  return (
    <div 
      onClick={onClick}
      className={`w-20 h-28 rounded-lg p-2 cursor-pointer transition-transform hover:scale-105`}
      style={{ backgroundColor: card.backgroundColor }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div 
          className={`w-14 h-14`}
          style={{ 
            backgroundColor: shapeColor,
            clipPath: card.shapeType === 'circle' 
              ? 'circle(50%)' 
              : card.shapeType === 'triangle'
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
              : 'none'
          }}
        />
      </div>
    </div>
  );
};

export default Card; 