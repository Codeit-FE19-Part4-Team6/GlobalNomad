import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileImageStore } from '@/stores/profileImageStore';
import { PrimaryButton } from '@/components/common/button';
import { PasswordInput, TextInput } from '@/components/common/input';
import Title from '@/components/common/Title';
import { Down } from '@/assets/icons';
import { useEditMyInfoMutation } from '@/hooks/queries/useEditMyInfo';
import { useMyInfo } from '@/hooks/queries/useMyInfo';
import { uploadImageToServer } from '@/apis/upload';
import type { User, UserEditRequest } from '@/apis/type';

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
// 폼 데이터 타입 정의
type FormValues = {
  nickname: string;
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export default function MyProfilePage({ setMobileOpen }: Props) {
  const { file, setFile, setProfileImageUrl } = useProfileImageStore(); // 전역 스토어에서 프로필 이미지 관련 상태 가져오기
  // react-hook-form 초기화
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const { data: myInfo, isLoading } = useMyInfo(); // 내 정보 조회 (React Query)

  // myInfo가 로딩되면 폼 초기값과 프로필 이미지 초기화
  useEffect(() => {
    if (!myInfo) {
      return;
    }

    reset({
      nickname: myInfo.nickname,
      email: myInfo.email,
      newPassword: '',
      newPasswordConfirm: '',
    });

    setProfileImageUrl(myInfo.profileImageUrl ?? '');
  }, [myInfo, reset, setProfileImageUrl]);

  const nickname = watch('nickname');
  const newPassword = watch('newPassword');
  const newPasswordConfirm = watch('newPasswordConfirm');

  // 내 정보 수정 Mutation 설정
  const editMyInfoMutation = useEditMyInfoMutation((data: User) => {
    setProfileImageUrl(data.profileImageUrl ?? '');
    setFile(null);
    reset({
      nickname: data.nickname,
      email: data.email,
      newPassword: '',
      newPasswordConfirm: '',
    });
  });
  // 폼이 변경되었는지 계산
  const isFormChanged = useMemo(() => {
    if (!myInfo) {
      return false;
    }

    const nicknameValue = nickname ?? '';
    const newPasswordValue = newPassword ?? '';
    const newPasswordConfirmValue = newPasswordConfirm ?? '';

    const isNicknameChanged = nicknameValue.trim() !== '' && nicknameValue !== myInfo.nickname;
    const isPasswordChanged =
      newPasswordValue.trim() !== '' || newPasswordConfirmValue.trim() !== '';
    const isImageChanged = !!file;

    return isNicknameChanged || isPasswordChanged || isImageChanged;
  }, [nickname, newPassword, newPasswordConfirm, file, myInfo]);
  // 폼 제출 처리
  const onSubmit = async (values: FormValues) => {
    if (!myInfo) {
      return;
    }
    const profileImageUrl = file ? await uploadImageToServer(file) : (myInfo.profileImageUrl ?? ''); // 프로필 이미지 업로드 (변경되었으면 서버로 전송)
    // 서버로 보낼 payload 구성
    const payload: Partial<UserEditRequest> = {
      nickname: values.nickname.trim() || myInfo.nickname,
      profileImageUrl,
    };
    if (values.newPassword.trim()) {
      payload.newPassword = values.newPassword.trim();
    }
    editMyInfoMutation.mutate(payload as UserEditRequest);
  };
  if (isLoading) {
    return <div className='px-4 py-10'>로딩 중...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-5 md:gap-6'>
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
        <TextInput label='닉네임' placeholder={myInfo?.nickname} {...register('nickname')} />
        <TextInput
          label='이메일'
          type='email'
          placeholder={myInfo?.email}
          disabled
          className='cursor-not-allowed bg-gray-50 text-gray-400'
          {...register('email')}
        />
        <PasswordInput
          label='비밀번호'
          placeholder='8자 이상 입력해주세요'
          {...register('newPassword', { minLength: { value: 8, message: '8자 이상 입력하세요' } })}
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
          type='submit'
          disabled={!isFormChanged}
          className='font-lg-bold md:font-md-bold mt-8 mb-3 h-12 w-full rounded-[14px] disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 md:mt-6 md:h-[41px] md:w-30 md:rounded-xl lg:w-auto lg:max-w-160'>
          수정하기
        </PrimaryButton>
      </div>
    </form>
  );
}
