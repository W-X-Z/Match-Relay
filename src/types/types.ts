export type BackgroundColor = 'gray' | 'white' | 'black';
export type ShapeType = 'circle' | 'square' | 'triangle';
export type ShapeColor = 'red' | 'blue' | 'yellow';

export interface Card {
  id: number;
  backgroundColor: BackgroundColor;
  shapeType: ShapeType;
  shapeColor: ShapeColor;
}

export interface Hint {
  boardIndices: number[];
  handIndex: number;
}

export interface GameState {
  board: Card[];
  hand: Card[];
  score: number;
  isGameOver: boolean;
  selectedCards: number[];
  hint?: Hint;
}

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};