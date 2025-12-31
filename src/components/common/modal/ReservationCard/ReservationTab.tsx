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
    <button type='button' onClick={onClick} className='relative w-full pb-3 lg:w-17.5'>
      <span className={active ? 'font-lg-bold text-primary-500' : 'font-lg-bold text-gray-500'}>
        {label}
      </span>

      {active && (
        <span className='bg-primary-500 absolute right-0 -bottom-1.25 left-0 h-0.5 rounded lg:w-17.5' />
      )}
    </button>
  );
}
