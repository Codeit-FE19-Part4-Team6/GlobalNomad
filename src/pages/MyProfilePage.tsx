import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileImageStore } from '@/stores/profileImageStore';
import { PrimaryButton } from '@/components/common/button';
import { PasswordInput, TextInput } from '@/components/common/input';
import Title from '@/components/common/Title';
import { Down } from '@/assets/icons';
import { getMyInfo, editMyInfo } from '@/apis/user';
import { uploadImageToServer } from '@/apis/upload';
import type { User, UserEditRequest } from '@/apis/type';

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  nickname: string;
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export default function MyProfilePage({ setMobileOpen }: Props) {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });
  /**
   * 프로필 이미지 관련 상태
   * - file: 실제 서버 업로드용 파일
   * - setProfileImageUrl: 업로드 성공 후 서버 이미지 URL 반영
   */
  const { file, setFile, setProfileImageUrl } = useProfileImageStore();
  const [myInfo, setMyInfo] = useState<User | null>(null); // 서버에서 내려온 내 정보 상태
  /**
   * watch: 폼 값 변경 감지
   * - isFormChanged 계산에 사용
   */
  const nickname = watch('nickname');
  const newPassword = watch('newPassword');
  const newPasswordConfirm = watch('newPasswordConfirm');

  // 내 정보 조회
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyInfo();
        setMyInfo(data);

        reset({
          nickname: data.nickname,
          email: data.email,
          newPassword: '',
          newPasswordConfirm: '',
        });

        setProfileImageUrl(data.profileImageUrl ?? '');
      } catch {
        alert('내 정보 조회를 실패했습니다.');
      }
    };
    fetchMyInfo();
  }, [reset, setProfileImageUrl]);

  /**
   * 폼 변경 여부 계산
   * - 닉네임 변경
   * - 비밀번호 입력
   * - 프로필 이미지 파일 선택 중 하나라도 있으면 true
   */
  const isFormChanged = useMemo(() => {
    if (!myInfo) {
      return false;
    }

    const isNicknameChanged = nickname?.trim() !== '' && nickname !== myInfo.nickname;
    const isPasswordChanged =
      newPassword?.trim().length > 0 || newPasswordConfirm?.trim().length > 0;
    const isImageChanged = !!file;

    return isNicknameChanged || isPasswordChanged || isImageChanged;
  }, [nickname, newPassword, newPasswordConfirm, file, myInfo]);

  // 내 정보 수정
  const onSubmit = async (values: FormValues) => {
    if (!myInfo) {
      return;
    }

    try {
      let uploadedUrl = myInfo.profileImageUrl ?? ''; // 기본값은 기존 프로필 이미지

      /**
       * 프로필 이미지가 변경된 경우에만 업로드
       * - 서버에서 이미지 업로드 후 URL 반환
       */
      if (file) {
        uploadedUrl = await uploadImageToServer(file);
        setProfileImageUrl(uploadedUrl);
        setFile(null); // 업로드 후 스토어 file 초기화
      }

      /**
       * 서버로 보낼 payload
       * - 변경된 값만 포함
       */
      const payload: Partial<UserEditRequest> = {
        nickname: values.nickname.trim() || myInfo.nickname,
        profileImageUrl: uploadedUrl,
      };

      // 비밀번호는 입력했을 때만 서버로 전송
      if (values.newPassword.trim()) {
        payload.newPassword = values.newPassword.trim();
      }

      await editMyInfo(payload); // 내 정보 수정 API 호출

      alert('내 정보가 수정되었습니다.');

      // 서버에 반영된 최신 값으로 폼 상태 초기홭
      reset({
        nickname: payload.nickname,
        email: myInfo.email,
        newPassword: '',
        newPasswordConfirm: '',
      });

      setMyInfo((prev) => (prev ? { ...prev, ...payload } : prev));
    } catch {
      alert('수정에 실패했습니다.');
    }
  };

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
        <TextInput label='닉네임' placeholder={myInfo?.nickname ?? ''} {...register('nickname')} />
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
