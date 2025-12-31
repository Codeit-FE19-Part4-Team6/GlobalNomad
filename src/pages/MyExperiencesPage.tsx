import { Down } from '@/assets/icons';
import { useOutletContext } from 'react-router-dom';

type OutletContextType = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MyExperiencesPage() {
  const { setMobileOpen } = useOutletContext<OutletContextType>();

  return (
    <Down
      className='block rotate-90 cursor-pointer md:hidden'
      onClick={() => setMobileOpen(false)}
    />
  );
}
