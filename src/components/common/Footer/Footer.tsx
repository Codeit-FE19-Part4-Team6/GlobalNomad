import FooterPolicy from './FooterPolicy';
import FooterSNS from './FooterSNS';

/**
 * Footer 컴포넌트
 *
 * @description
 * 전역 레이아웃 하단에 위치하는 푸터 컴포넌트입니다.
 *
 * 반응형 레이아웃을 고려하여 다음과 같이 동작합니다.
 * - 모바일:
 *   - 상단: Privacy Policy / FAQ
 *   - 하단: 좌측 ©codeit - 2023 / 우측 SNS 아이콘
 * - 태블릿·PC:
 *   - 좌측: ©codeit - 2023
 *   - 중앙: Privacy Policy / FAQ
 *   - 우측: SNS 아이콘
 *
 * @remarks
 * - 배경색은 없으며 상단 border만 존재합니다.
 * - 높이는 breakpoint 기준으로 고정됩니다.
 *   - mobile: 116px
 *   - tablet / pc: 140px
 * - compound pattern은 사용하지 않고, 역할 단위로만 컴포넌트를 분리했습니다.
 */

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
