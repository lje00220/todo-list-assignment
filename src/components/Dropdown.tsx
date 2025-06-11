import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownProps {
  setFilteredOption: (option: string) => void;
}

/**
 * 드롭다운 컴포넌트
 * @returns {JSX.Element}
 */
const Dropdown = ({ setFilteredOption }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = [
    {
      label: '전체 보기',
      value: 'all',
    },
    {
      label: '남은 할 일',
      value: 'active',
    },
    {
      label: '완료한 일',
      value: 'completed',
    },
  ];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setFilteredOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative text-left">
      <button onClick={handleToggleDropdown} className="flex">
        필터링 {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="absolute w-32 rounded-md bg-gray-100 px-3 py-3 shadow-xl">
          <ul className="flex flex-col gap-2 text-center">
            {options.map((option) => (
              <li
                onClick={() => handleSelectOption(option.value)}
                key={option.value}
                className="cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
