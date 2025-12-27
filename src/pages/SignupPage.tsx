// src/pages/SignupPage.tsx

import { Logo } from '@/components/common/Logo';
import { PrimaryButton, SecondaryButton } from '@/components/common/button';
import { PasswordInput, TextInput } from '@/components/common/input';
import Images from '@/assets/images';
import { useSignupForm } from '@/hooks/useSignupForm';

const SignupPage = () => {
  const {
    registerOptions,
    errors,
    isSubmitting,
    isFormValid,
    handleSubmit,
    handleEmailCheck,
    handleNicknameCheck,
    getErrorMessage,
  } = useSignupForm();

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto my-[60px] flex max-w-[328px] flex-col items-center justify-center sm:my-[120px] sm:max-w-[640px]'>
      <Logo
        direction='vertical'
        iconClassName='h-[144px] w-[144px] mb-6'
        titleClassName='h-[31px] w-[255px]'
        className='mb-[62px]'
      />
      <div className='flex w-full flex-col items-center gap-[30px]'>
        <div className='flex w-full flex-col items-center justify-center gap-5'>
          {/* 이메일 */}
          <TextInput
            label='이메일'
            type='email'
            placeholder='이메일을 입력해주세요'
            {...registerOptions.email}
            error={!!errors.email}
            errorMessage={getErrorMessage(errors.email)}
            onBlur={(e) => handleEmailCheck(e.target.value)}
          />

          {/* 닉네임 */}
          <TextInput
            label='닉네임'
            placeholder='닉네임을 입력해 주세요'
            {...registerOptions.nickname}
            error={!!errors.nickname}
            errorMessage={getErrorMessage(errors.nickname)}
            onBlur={(e) => handleNicknameCheck(e.target.value)}
          />

          {/* 비밀번호 */}
          <PasswordInput
            label='비밀번호'
            placeholder='8자 이상 입력해주세요'
            {...registerOptions.password}
            error={!!errors.password}
            errorMessage={getErrorMessage(errors.password)}
          />

          {/* 비밀번호 확인 */}
          <PasswordInput
            label='비밀번호 확인'
            placeholder='비밀번호를 한 번 더 입력해 주세요'
            {...registerOptions.passwordConfirm}
            error={!!errors.passwordConfirm}
            errorMessage={getErrorMessage(errors.passwordConfirm)}
          />
        </div>

        <PrimaryButton
          type='submit'
          disabled={!isFormValid || isSubmitting}
          className='font-lg-bold w-full'>
          {isSubmitting ? '처리 중...' : '회원가입하기'}
        </PrimaryButton>

        <div className='font-lg-medium flex w-full items-center justify-around gap-4 text-gray-500'>
          <div className='h-px flex-1 bg-gray-300'></div>
          <div>SNS 계정으로 회원가입하기</div>
          <div className='h-px flex-1 bg-gray-300'></div>
        </div>

        <SecondaryButton type='button' className='w-full'>
          <div className='flex items-center gap-2 text-gray-600'>
            <img src={Images.KakaoIcon} alt='카카오 로그인 버튼' className='h-6 w-6' />
            카카오 회원가입
          </div>
        </SecondaryButton>

        <div className='text-gray-400'>
          회원이신가요?{' '}
          <a href='/login' className='underline'>
            로그인하기
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
