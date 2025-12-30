import { useProfileImageStore } from '@/stores/profileImageStore';
import Icons from '@/assets/icons';
import { PrimaryButton } from '@/components/common/button';
import { PasswordInput, TextInput } from '@/components/common/input';
import Title from '@/components/common/Title';
import { useForm } from 'react-hook-form';

type MyProfilePageProps = {
  setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  nickname: string;
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
};

// TODO: mock 내 정보 추후 제거 (내 정보 조회 API 대체)
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

  // 프로필 이미지 스토어
  const { previewUrl } = useProfileImageStore();

  // 현재 폼 값 감시
  const values = watch();

  // 🔹 변경 여부 판단
  const isNicknameChanged =
    values.nickname.trim() !== '' && values.nickname !== mockMyInfo.nickname;

  // 비밀번호 / 비밀번호 확인 중 하나라도 입력되면 변경
  const isPasswordChanged =
    values.newPassword.trim().length > 0 || values.newPasswordConfirm.trim().length > 0;

  // 이미지가 바뀌었는지
  const isImageChanged = !!previewUrl;

  // 이메일은 수정 불가 변경 여부에서 제외
  const isFormChanged = isNicknameChanged || isPasswordChanged || isImageChanged;

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
              !values.newPassword || value === values.newPassword || '비밀번호가 일치하지 않습니다',
          })}
          error={!!errors.newPasswordConfirm}
          errorMessage={errors.newPasswordConfirm?.message}
        />
      </div>
      <div className='flex justify-center'>
        <PrimaryButton
          disabled={!isFormChanged}
          className='font-lg-bold md:font-md-bold mt-8 mb-3 h-12 w-full rounded-[14px] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 md:mt-6 md:h-[41px] md:w-30 md:rounded-xl lg:w-auto lg:max-w-160'>
          수정하기
        </PrimaryButton>
      </div>
    </div>
  );
}
