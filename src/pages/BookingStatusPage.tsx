import { useOutletContext } from 'react-router-dom';
import Icons from '@/assets/icons';

type OutletContextType = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BookingStatusPage() {
  const { setMobileOpen } = useOutletContext<OutletContextType>();

  return (
    <Icons.Down
      className='block rotate-90 cursor-pointer md:hidden'
      onClick={() => setMobileOpen(false)}
    />
  );
}
