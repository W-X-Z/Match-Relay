import { create } from 'zustand';
import { GameState, Card, Hint } from '../types/types';
import { compareAttributes, createUniqueRandomCard } from '../utils/gameLogic';

interface GameStore extends GameState {
  placeCard: (cardIndex: number) => void;
  initGame: () => void;
  checkGameEnd: () => void;
  selectCard: (boardIndex: number) => void;
  isPlacingCard: boolean;
}

const INITIAL_HAND_SIZE = 5;

export const useGameStore = create<GameStore>((set, get) => ({
  board: [],
  hand: [],
  score: 0,
  isGameOver: false,
  selectedCards: [],
  isPlacingCard: false,

  initGame: () => {
    const initialBoard: Card[] = [];
    const initialHand: Card[] = [];
    
    // 보드 카드 생성
    for (let i = 0; i < 5; i++) {
      initialBoard.push(createUniqueRandomCard(i, [...initialBoard]));
    }
    
    // 손패 카드 생성
    for (let i = 0; i < 5; i++) {
      initialHand.push(createUniqueRandomCard(i + 5, [...initialBoard, ...initialHand]));
    }
    
    set({
      board: initialBoard,
      hand: initialHand,
      score: 0,
      isGameOver: false,
      selectedCards: []
    });
  },

  placeCard: (cardIndex: number) => {
    const { hand, board, selectedCards } = get();
    // 선택된 손패 카드에 isMoving 플래그 부여
    const cardToPlace = { ...hand[cardIndex], isMoving: true };
    if (selectedCards.length !== 2) return;
    
    const selectedBoardCards = [
      board[selectedCards[0]],
      board[selectedCards[1]],
      cardToPlace
    ];
    
    const validation = compareAttributes(selectedBoardCards, cardToPlace);
    if (!validation.isValid) return;
    
    // board의 첫 번째 카드를 제거하고, 정답 카드를 오른쪽 끝에 추가 (카드 복사 시 isMoving 플래그 해제)
    const newBoard = [...board.slice(1), { ...cardToPlace, isMoving: false }];
    
    const newHand = [...hand];
    newHand.splice(cardIndex, 1);
    // 새로운 손패 카드를 생성하여 추가
    const newCard = createUniqueRandomCard(Date.now(), [...newBoard, ...newHand]);
    newHand.push(newCard);
    
    // 애니메이션 실행 플래그 활성화
    set({ isPlacingCard: true });
    
    setTimeout(() => {
      set({
        board: newBoard,
        hand: newHand,
        score: get().score + 1,
        selectedCards: [],
        isPlacingCard: false
      });
    }, 300);
  },

  checkGameEnd: () => {
    const { hand, board } = get();
    let possibleMove: Hint | undefined = undefined;
    const lastFiveCards = board.slice(-5);

    for (let handIndex = 0; handIndex < hand.length; handIndex++) {
      const handCard = hand[handIndex];
      for (let i = 0; i < lastFiveCards.length - 1; i++) {
        for (let j = i + 1; j < lastFiveCards.length; j++) {
          const selectedBoardCards = [lastFiveCards[i], lastFiveCards[j], handCard];
          const validation = compareAttributes(selectedBoardCards, handCard);
          if (validation.isValid) {
            possibleMove = {
              boardIndices: [board.length - 5 + i, board.length - 5 + j],
              handIndex
            };
            break;
          }
        }
        if (possibleMove) break;
      }
      if (possibleMove) break;
    }

    if (!possibleMove) {
      // 실제로 카드를 놓을 수 없는 경우
      const newBoard: Card[] = [];
      const newHand: Card[] = [];

      // 새로운 보드 카드 생성
      for (let i = 0; i < 5; i++) {
        newBoard.push(createUniqueRandomCard(Date.now() + i, [...newBoard]));
      }
      
      // 새로운 손패 카드 생성
      for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
        newHand.push(createUniqueRandomCard(Date.now() + i + 5, [...newBoard, ...newHand]));
      }

      set(state => ({
        board: newBoard,
        hand: newHand,
        score: state.score + 3,
        selectedCards: []
      }));
    } else {
      // 카드를 놓을 수 있는데 "결"을 선언한 경우
      set({
        isGameOver: true,
        hint: possibleMove
      });
    }
  },

  selectCard: (boardIndex: number) => {
    const { selectedCards } = get();
    if (selectedCards.length === 2) {
      set({ selectedCards: [] });
      return;
    }

    const newSelectedCards = selectedCards.includes(boardIndex)
      ? selectedCards.filter(index => index !== boardIndex)
      : [...selectedCards, boardIndex];

    set({ selectedCards: newSelectedCards });
  }
})); 