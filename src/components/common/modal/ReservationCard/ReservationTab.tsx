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
    <button type='button' onClick={onClick} className='relative w-[100%] pb-3 lg:w-[70px]'>
      <span className={active ? 'font-lg-bold text-primary-500' : 'font-lg-bold text-gray-500'}>
        {label}
      </span>

      {active && (
        <span className='bg-primary-500 absolute right-0 bottom-[-5px] left-0 h-[2px] rounded lg:w-[70px]' />
      )}
    </button>
  );
}
