import FooterPolicy from './FooterPolicy';
import FooterSNS from './FooterSNS';

const Footer = () => {
  return (
    <footer className='w-full border-t border-gray-200'>
      <div className='mx-auto h-[116px] max-w-[1520px] px-6 md:h-[140px]'>
        {/* 모바일: 정책 / FAQ 윗줄 */}
        <div className='flex justify-center pt-6 pb-4 md:hidden'>
          <FooterPolicy />
        </div>

        {/* 모바일 하단 + PC 전체 한 줄 */}
        <div className='flex items-center justify-between md:h-full'>
          {/* 왼쪽: 카피라이트 */}
          <span className='text-sm text-gray-400'>&copy; codeit - 2023</span>

          {/* 가운데: PC 전용 정책 / FAQ */}
          <div className='hidden md:flex'>
            <FooterPolicy />
          </div>

          {/* 오른쪽: SNS */}
          <FooterSNS />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
