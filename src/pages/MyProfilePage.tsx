import { useProfileImageStore } from '@/stores/profileImageStore';
import Icons from '@/assets/icons';
import { PrimaryButton } from '@/components/common/button';
import { PasswordInput, TextInput } from '@/components/common/input';
import Title from '@/components/common/Title';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

type MyProfilePageProps = {
  setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  nickname: string;
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
};

// TODO: 추후 내 정보 조회 API로 대체 예정
// 현재는 UI/로직 테스트를 위한 mock 데이터
const mockMyInfo = {
  nickname: '수정 전 이름',
  email: 'test@email.com',
};

export default function MyProfilePage({ setMobileOpen }: MyProfilePageProps) {
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

  // previewUrl이 존재하면 사용자가 이미지를 변경한 상태
  const { previewUrl } = useProfileImageStore();

  // 필요한 필드만 개별적으로 watch
  const nickname = watch('nickname');
  const newPassword = watch('newPassword');
  const newPasswordConfirm = watch('newPasswordConfirm');

  // 닉네임: 값이 있고 + 기존 닉네임과 다를 때
  // 비밀번호: 비밀번호 or 비밀번호 확인 중 하나라도 입력되면 변경
  // 이미지: previewUrl이 존재하면 변경
  // useMemo를 사용해 의존 값이 바뀔 때만 재계산
  const isFormChanged = useMemo(() => {
    const isNicknameChanged = nickname.trim() !== '' && nickname !== mockMyInfo.nickname;
    const isPasswordChanged = newPassword.trim().length > 0 || newPasswordConfirm.trim().length > 0;
    const isImageChanged = !!previewUrl;

    return isNicknameChanged || isPasswordChanged || isImageChanged;
  }, [nickname, newPassword, newPasswordConfirm, previewUrl]);

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
            minLength: {
              value: 8,
              message: '8자 이상 입력하세요',
            },
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
