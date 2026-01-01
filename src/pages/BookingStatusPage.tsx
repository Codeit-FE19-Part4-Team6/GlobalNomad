import { Down } from '@/assets/icons';

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BookingStatusPage({ setMobileOpen }: Props) {
  return (
    <div className='px-4 py-4'>
      <Down
        className='block rotate-90 cursor-pointer md:hidden'
        onClick={() => setMobileOpen(false)}
      />
    </div>
  );
}
