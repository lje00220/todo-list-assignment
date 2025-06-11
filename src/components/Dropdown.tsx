import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterOptionType, FilterType } from '@/types/TodoType';
import { FILTERS } from '@/constants';

interface DropdownProps {
  setFilteredOption: (option: FilterType) => void;
}

/**
 * 드롭다운 컴포넌트
 * @returns {JSX.Element}
 */
const Dropdown = ({ setFilteredOption }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options: FilterOptionType[] = [
    {
      label: '전체 보기',
      value: FILTERS.ALL,
    },
    {
      label: '남은 할 일',
      value: FILTERS.ACTIVE,
    },
    {
      label: '완료한 일',
      value: FILTERS.COMPLETED,
    },
  ];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: FilterType) => {
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
