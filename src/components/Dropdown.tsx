import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * 드롭다운 컴포넌트
 * @returns {JSX.Element}
 */
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative text-left">
      <button onClick={handleToggleDropdown} className="flex">
        필터 {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="absolute w-32 rounded-md bg-gray-100 px-3 py-3 shadow-xl">
          <ul className="flex flex-col gap-2 text-center">
            <li className="cursor-pointer">전체 보기</li>
            <li className="cursor-pointer">남은 할 일</li>
            <li className="cursor-pointer">완료한 일</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
