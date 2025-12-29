import Icons from '@/assets/icons';
import { PrimaryButton } from '@/components/common/button';
import Title from '@/components/common/Title';

type MyProfilePageProps = {
  setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MyProfilePage({ setMobileOpen }: MyProfilePageProps) {
  return (
    <div className='flex w-full flex-col gap-5 md:gap-6'>
      <div className='flex flex-col items-start gap-2.5 py-2.5'>
        <Icons.Down
          className='block rotate-90 cursor-pointer md:hidden'
          onClick={() => setMobileOpen?.(false)}
        />
        <Title as='h3' size='xl' weight='bold'>
          내 정보
        </Title>
        <div className='font-md-medium text-gray-500'>
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </div>
      </div>
      <div className='flex flex-col gap-[18px] md:gap-6'></div>
      <div className='flex justify-center'>
        <PrimaryButton className='font-lg-bold md:font-md-bold mt-8 mb-3 h-12 w-full rounded-[14px] md:mt-6 md:h-[41px] md:w-30 md:rounded-xl lg:w-auto lg:max-w-160'>
          저장하기
        </PrimaryButton>
      </div>
    </div>
  );
}
