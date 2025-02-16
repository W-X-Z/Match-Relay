import React, { useState } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  
  if (!isOpen) return null;

  const content = {
    ko: {
      title: '게임 방법',
      rules: [
        '1. 보드에서 카드 2개를 선택합니다.',
        '2. 손패에서 카드를 선택하여 배치합니다.',
        '3. 새로 놓을 카드는 선택한 2개의 카드와 비교하여 각 속성이 "모두 같거나" 또는 "모두 달라야" 합니다.',
        '4. 더 이상 카드를 놓을 수 없다면 \'No Match\'를 선언하세요.'
      ],
      confirm: '확인'
    },
    en: {
      title: 'How to Play',
      rules: [
        '1. Select 2 cards from the board.',
        '2. Select and place a card from your hand.',
        '3. The new card\'s attributes must be "all same" or "all different" compared to the selected cards.',
        '4. Declare \'No Match\' when no more cards can be placed.'
      ],
      confirm: 'Confirm'
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{content[language].title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-1 rounded ${language === 'ko' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              한국어
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              English
            </button>
          </div>
        </div>
        <div className="text-sm sm:text-base space-y-2">
          {content[language].rules.map((rule, index) => (
            <p key={index}>{rule}</p>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {content[language].confirm}
        </button>
      </div>
    </div>
  );
};

export default HelpModal; 