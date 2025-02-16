import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">게임 방법</h2>
        <div className="text-sm sm:text-base space-y-2">
          <p>1. 보드에서 카드 2개를 선택합니다.</p>
          <p>2. 손패에서 카드를 선택하여 배치합니다.</p>
          <p>3. 새로 놓을 카드는 선택한 2개의 카드와 비교하여 각 속성이 "모두 같거나" 또는 "모두 달라야" 합니다.</p>
          <p>4. 더 이상 카드를 놓을 수 없다면 'No Match'를 선언하세요.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default HelpModal; 