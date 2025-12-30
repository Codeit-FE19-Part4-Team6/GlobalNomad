import Icons from '@/assets/icons';

/**
 * FooterSNS 컴포넌트
 *
 * @description
 * 푸터에 노출되는 SNS 아이콘 링크 목록을 렌더링하는 컴포넌트입니다.
 * 아이콘 정보는 상단의 `snsLinks` 설정 배열을 기반으로 동적으로 생성됩니다.
 *
 * @remarks
 * - SNS 아이콘은 데이터 기반으로 관리하여
 *   추가 / 삭제 / 순서 변경 시 JSX 수정 없이 확장할 수 있습니다.
 * - 각 링크는 외부 페이지 이동을 가정하여
 *   `target="_blank"` 및 보안 속성(`rel="noopener noreferrer"`)을 포함합니다.
 * - 접근성을 고려하여 모든 링크에 `aria-label`을 제공합니다.
 */

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
