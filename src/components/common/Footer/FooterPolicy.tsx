/**
 * FooterPolicy 컴포넌트
 *
 * @description
 * 푸터 내 Privacy Policy 및 FAQ 링크 영역을 담당합니다.
 *
 * @remarks
 * - Footer 레이아웃에 따라 위치만 변경되며
 *   내부 UI 및 역할은 항상 동일합니다.
 * - 클릭 시 라우팅 또는 외부 링크로 확장 가능하도록
 *   단순한 UI 컴포넌트로 유지합니다.
 */

const FooterPolicy = () => {
  return (
    <div className='flex items-center gap-6 text-sm text-gray-400'>
      <a href='#' className='hover:text-gray-600'>
        Privacy Policy
      </a>
      <span>∙</span>
      <a href='#' className='hover:text-gray-600'>
        FAQ
      </a>
    </div>
  );
};

export default FooterPolicy;
