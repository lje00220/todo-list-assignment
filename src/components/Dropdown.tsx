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
      <button
        onClick={handleToggleDropdown}
        className="flex items-center gap-1 px-3 py-2 text-sm transition hover:font-bold"
      >
        필터링 {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-28 rounded-md border border-gray-200 bg-white shadow-lg">
          <ul className="flex flex-col gap-1 text-center text-sm">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className="cursor-pointer px-3 py-2 transition hover:bg-gray-100"
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
