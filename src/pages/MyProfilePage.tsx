import { useProfileImageStore } from '@/stores/profileImageStore';
import { PrimaryButton } from '@/components/common/button';
import { PasswordInput, TextInput } from '@/components/common/input';
import Title from '@/components/common/Title';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { Down } from '@/assets/icons';

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  nickname: string;
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
};

// mock 데이터 (추후 API 응답으로 대체 예정)
const mockMyInfo = {
  nickname: '수정 전 이름',
  email: 'test@email.com',
};

export default function MyProfilePage({ setMobileOpen }: Props) {
  /**
   * react-hook-form 설정
   * - onBlur: input 포커스가 빠질 때 검증
   * - defaultValues: 초기 폼 상태
   */
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
      email: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });
  /**
   * 프로필 이미지 미리보기 상태
   * - 이미지 변경 여부 판단에 사용
   */
  const { previewUrl } = useProfileImageStore();
  /**
   * 입력값 실시간 감시
   * 변경 여부 판단을 위해 사용
   */
  const nickname = watch('nickname');
  const newPassword = watch('newPassword');
  const newPasswordConfirm = watch('newPasswordConfirm');
  /**
   * 폼 변경 여부 계산
   * - 닉네임 변경
   * - 비밀번호 입력 여부
   * - 프로필 이미지 변경 여부
   * → 하나라도 변경되면 "수정하기" 버튼 활성화
   */
  const isFormChanged = useMemo(() => {
    const isNicknameChanged = nickname.trim() !== '' && nickname !== mockMyInfo.nickname;
    const isPasswordChanged = newPassword.trim().length > 0 || newPasswordConfirm.trim().length > 0;
    const isImageChanged = !!previewUrl;

    return isNicknameChanged || isPasswordChanged || isImageChanged;
  }, [nickname, newPassword, newPasswordConfirm, previewUrl]);

  return (
    <div className='flex w-full flex-col gap-5 md:gap-6'>
      <div className='flex flex-col items-start gap-2.5 py-2.5'>
        <Down
          className='block rotate-90 cursor-pointer md:hidden'
          onClick={() => setMobileOpen(false)}
        />
        <Title as='h3' size='xl' weight='bold'>
          내 정보
        </Title>
        <div className='font-md-medium text-gray-500'>
          닉네임과 비밀번호, 프로필 이미지를 수정하실 수 있습니다.
        </div>
      </div>

      <div className='flex flex-col gap-[18px] md:gap-6'>
        <TextInput label='닉네임' placeholder={mockMyInfo.nickname} {...register('nickname')} />
        <TextInput
          label='이메일'
          type='email'
          disabled
          className='cursor-not-allowed bg-gray-50 text-gray-400'
          placeholder={mockMyInfo.email}
          {...register('email')}
        />
        <PasswordInput
          label='비밀번호'
          placeholder='8자 이상 입력해주세요'
          {...register('newPassword', {
            minLength: { value: 8, message: '8자 이상 입력하세요' },
          })}
          error={!!errors.newPassword}
          errorMessage={errors.newPassword?.message}
        />
        <PasswordInput
          label='비밀번호 확인'
          placeholder='비밀번호를 한 번 더 입력해주세요'
          {...register('newPasswordConfirm', {
            validate: (value) =>
              !newPassword || value === newPassword || '비밀번호가 일치하지 않습니다',
          })}
          error={!!errors.newPasswordConfirm}
          errorMessage={errors.newPasswordConfirm?.message}
        />
      </div>

      <div className='flex justify-center'>
        <PrimaryButton
          disabled={!isFormChanged}
          className='font-lg-bold md:font-md-bold mt-8 mb-3 h-12 w-full rounded-[14px] disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 md:mt-6 md:h-[41px] md:w-30 md:rounded-xl lg:w-auto lg:max-w-160'>
          수정하기
        </PrimaryButton>
      </div>
    </div>
  );
}
