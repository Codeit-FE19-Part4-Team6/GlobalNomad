export default function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type='button' onClick={onClick} className='relative pb-3'>
      <span className={active ? 'font-semibold text-blue-600' : 'text-gray-500'}>{label}</span>

      {active && (
        <span className='absolute right-0 bottom-[-5px] left-0 h-[2px] rounded bg-blue-600' />
      )}
    </button>
  );
}
