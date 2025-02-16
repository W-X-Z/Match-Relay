import { Card, ValidationResult } from '../types/types';

// 카드 속성 비교 함수
const compareAttributes = (cards: Card[], newCard: Card): ValidationResult => {
  if (cards.length !== 3) {
    return {
      isValid: false,
      message: '3개의 카드가 필요합니다.'
    };
  }

  const attributes: (keyof Omit<Card, 'id'>)[] = ['backgroundColor', 'shapeType', 'shapeColor'];
  
  let isValidCombination = true;
  for (const attr of attributes) {
    const values = [cards[0][attr], cards[1][attr], cards[2][attr]];
    const allSame = values.every(v => v === values[0]);
    const allDifferent = new Set(values).size === values.length;
    
    if (!allSame && !allDifferent) {
      isValidCombination = false;
      break;
    }
  }

  return {
    isValid: isValidCombination,
    message: isValidCombination ? undefined : '각 속성이 모두 같거나 모두 달라야 합니다.'
  };
};

const isCardDuplicate = (card: Card, existingCards: Card[]): boolean => {
  return existingCards.some(existing => 
    existing.backgroundColor === card.backgroundColor &&
    existing.shapeType === card.shapeType &&
    existing.shapeColor === card.shapeColor
  );
};

const createUniqueRandomCard = (id: number, existingCards: Card[]): Card => {
  const backgrounds = ['gray', 'white', 'black'];
  const shapes = ['circle', 'square', 'triangle'];
  const colors = ['red', 'blue', 'yellow'];
  
  let newCard: Card;
  do {
    newCard = {
      id,
      backgroundColor: backgrounds[Math.floor(Math.random() * 3)] as Card['backgroundColor'],
      shapeType: shapes[Math.floor(Math.random() * 3)] as Card['shapeType'],
      shapeColor: colors[Math.floor(Math.random() * 3)] as Card['shapeColor'],
    };
  } while (isCardDuplicate(newCard, existingCards));
  
  return newCard;
};

export { compareAttributes, createUniqueRandomCard, isCardDuplicate }; 