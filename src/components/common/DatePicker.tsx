import { useState } from 'react';
import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Icons from '@/assets/icons';
import { useDropdown } from '@/hooks/useDropdown';

function formatDate(date?: Date | null) {
  if (!date) {
    return '';
  }
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}/${mm}/${dd}`;
}

function DateInput({ value }: { value?: Date | null }) {
  return (
    <div className='flex h-13.5 w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-3 py-4 md:rounded-2xl md:px-5'>
      <span
        className={`font-md-medium md:font-lg-medium ${value ? 'text-gray-950' : 'text-gray-400'}`}>
        {value ? formatDate(value) : 'yy/mm/dd'}
      </span>
      {value ? <Icons.PasswordHidden className='text-gray-400' /> : <Icons.Calendar />}
    </div>
  );
}
/**
 * DatePicker 컴포넌트
 * - 내부에 Dropdown, DropdownTrigger, DropdownList 사용
 * 날짜 객체를 'yy/mm/dd' 형식 문자열로 변환합니다.
 * 날짜 선택 시 상태를 업데이트하고 드롭다운을 닫습니다.
 *
 */
export function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <Dropdown className='relative w-full lg:max-w-90'>
      <DropdownTrigger className='w-full cursor-pointer'>
        <DateInput value={selectedDate} />
      </DropdownTrigger>
      <DropdownList className='absolute right-0 z-50 mt-2'>
        <InnerCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
      </DropdownList>
    </Dropdown>
  );
}

function InnerCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate?: Date;
  onSelect: (date: Date | undefined) => void;
}) {
  const { close } = useDropdown();

  const handleSelectDate = (date?: Date) => {
    onSelect(date);
    close();
  };

  return (
    <DayPicker
      mode='single'
      selected={selectedDate}
      onSelect={handleSelectDate}
      className='font-md-medium h-80 w-full overflow-auto rounded-xl border border-gray-100 bg-white p-2 md:rounded-2xl'
      modifiersClassNames={{
        selected: 'bg-primary-100 text-primary-500 font-md-bold rounded-full',
        today: 'text-primary-500 font-md-medium',
        disabled: 'text-gray-300 cursor-not-allowed',
      }}
      disabled={[{ before: new Date() }]}
    />
  );
}
