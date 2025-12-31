import { Down } from '@/assets/icons';

// 부모(MyPageLayout)에서 전달받는 props 타입
// - setMobileOpen: 모바일에서 사이드바 -> 콘텐츠 전환 제어
type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MyExperiencesPage({ setMobileOpen }: Props) {
  return (
    <div className='px-4 py-4'>
      <Down
        className='block rotate-90 cursor-pointer md:hidden'
        onClick={() => setMobileOpen(false)}
      />
    </div>
  );
}
