import Icons from '@/assets/icons';

type BookingStatusPageProps = {
  setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function BookingStatusPage({ setMobileOpen }: BookingStatusPageProps) {
  return (
    <>
      <Icons.Down
        className='block rotate-90 cursor-pointer md:hidden'
        onClick={() => setMobileOpen?.(false)}
      />
    </>
  );
}
