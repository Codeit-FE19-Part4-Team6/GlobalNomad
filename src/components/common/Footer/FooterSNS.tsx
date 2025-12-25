import Icons from '@/assets/icons';

const snsLinks = [
  {
    Icon: Icons.FaceBook,
    label: '페이스북으로 이동',
    href: '#',
  },
  {
    Icon: Icons.Instagram,
    label: '인스타그램으로 이동',
    href: '#',
  },
  { Icon: Icons.Youtube, label: '유튜브로 이동', href: '#' },
  { Icon: Icons.X, label: 'X로 이동', href: '#' },
];

const FooterSNS = () => {
  return (
    <div className='flex items-center gap-4 text-gray-400'>
      {snsLinks.map(({ Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={label}
          className='hover:text-gray-600'>
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default FooterSNS;
