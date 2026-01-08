import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileImageStore } from '@/stores/profileImageStore';
import { PrimaryButton } from '@/components/common/button';
import { PasswordInput, TextInput } from '@/components/common/input';
import Title from '@/components/common/Title';
import { Down } from '@/assets/icons';
import { useEditMyInfoMutation } from '@/hooks/queries/useEditMyInfoMutation';
import { useMyInfo } from '@/hooks/queries/useMyInfo';
import { uploadImageToServer } from '@/apis/upload';
import type { User, UserEditRequest } from '@/apis/type';
import { useNavigate } from 'react-router-dom';

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
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const { data: myInfo, isLoading } = useMyInfo(); // 내 정보 조회 (React Query)
  const navigate = useNavigate();

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
    setTimeout(() => {
      navigate('/');
    }, 3000);
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

    const payload: Partial<UserEditRequest> = {};

    // 닉네임: 변경된 경우만
    const trimmedNickname = values.nickname.trim();
    if (trimmedNickname && trimmedNickname !== myInfo.nickname) {
      payload.nickname = trimmedNickname;
    }
    // 비밀번호: 입력된 경우만
    if (values.newPassword.trim()) {
      payload.newPassword = values.newPassword.trim();
    }
    // 프로필 이미지: 변경된 경우만
    if (file) {
      payload.profileImageUrl = await uploadImageToServer(file);
    }
    // 아무 것도 안 바뀌었으면 요청 안 보냄
    if (Object.keys(payload).length === 0) {
      return;
    }
    editMyInfoMutation.mutate(payload);
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
        <TextInput
          label='닉네임'
          maxLength={8}
          {...register('nickname', {
            maxLength: {
              value: 8,
              message: '닉네임은 8자 이내로 입력해주세요',
            },
          })}
        />
        <TextInput
          label='이메일'
          type='email'
          placeholder={myInfo?.email ?? ''}
          disabled
          className='cursor-not-allowed bg-gray-50 text-gray-400'
          {...register('email')}
        />
        <PasswordInput
          label='비밀번호'
          placeholder='8자 이상 입력해주세요'
          {...register('newPassword', {
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다',
            },
            maxLength: {
              value: 16,
              message: '비밀번호는 16자 이하로 입력해주세요',
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
          type='submit'
          disabled={!isFormChanged || !isValid}
          className='font-lg-bold md:font-md-bold mt-8 mb-3 h-12 w-full rounded-[14px] disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 md:mt-6 md:h-[41px] md:w-30 md:rounded-xl lg:w-auto lg:max-w-160'>
          수정하기
        </PrimaryButton>
      </div>
    </form>
  );
}
