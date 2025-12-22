import { useState } from 'react';
import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Icons from '@/assets/icons';
import { useDropdown } from '@/hooks/useDropdown';

// 날짜를 yy/mm/dd 형식으로 변환
function formatDate(date?: Date | null) {
  if (!date) {
    return '';
  }
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}/${mm}/${dd}`;
}

// 임시 인풋
function TempDateInput({ value }: { value?: Date | null }) {
  return (
    <div className='flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 md:w-full md:rounded-2xl'>
      <span className={`font-lg-medium ${value ? 'text-gray-950' : 'text-gray-400'}`}>
        {value ? formatDate(value) : 'yy/mm/dd'}
      </span>
      <Icons.Calendar />
    </div>
  );
}

export function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <Dropdown>
      <DropdownTrigger>
        <TempDateInput value={selectedDate} />
      </DropdownTrigger>

      <DropdownList className='absolute z-50 mt-2 rounded-xl border border-gray-100 bg-white md:rounded-2xl'>
        <InnerCalendar
          selectedDate={selectedDate}
          onSelect={(date) => setSelectedDate(date ?? undefined)}
        />
      </DropdownList>
    </Dropdown>
  );
}

function InnerCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
}) {
  const { close } = useDropdown();

  const handleSelectDate = (date?: Date) => {
    if (!date) {
      return;
    }
    onSelect(date);
    close();
  };

  return (
    <DayPicker
      mode='single'
      selected={selectedDate}
      onSelect={handleSelectDate}
      className='[&_button]:hover h-80 w-80'
    />
  );
}
