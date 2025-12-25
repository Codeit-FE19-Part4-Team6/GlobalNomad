import Icons from '@/assets/icons';
import { Link } from 'react-router-dom';

const FooterSNS = () => {
  return (
    <div className='flex items-center gap-4 text-gray-400'>
      <Link to='/' aria-label='페이스북으로 이동' className='hover:text-gray-600'>
        <Icons.FaceBook />
      </Link>
      <Link to='/' aria-label='인스타그램으로 이동' className='hover:text-gray-600'>
        <Icons.Instagram />
      </Link>
      <Link to='/' aria-label='유튜브로 이동' className='hover:text-gray-600'>
        <Icons.Youtube />
      </Link>
      <Link to='/' aria-label='X로 이동' className='hover:text-gray-600'>
        <Icons.X />
      </Link>
    </div>
  );
};

export default FooterSNS;
