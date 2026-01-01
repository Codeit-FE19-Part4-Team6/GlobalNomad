import ActivityForm from '@/components/ActivityForm';
import type { CreateActivityRequest } from '@/apis/type';
import { useCreateActivity } from '@/hooks/useCreateActivity';
import { uploadActivityImage } from '@/apis/uploadActivityImage';
// import { isAxiosError } from 'axios'; //등록 후 에러처리용
// import { useNavigate } from 'react-router-dom'; //등록 후 내 체험관리로 이동
export default function CreateActivityPage() {
  const { mutate, isPending } = useCreateActivity();

  const handleCreate = (payload: CreateActivityRequest) => {
    mutate(payload, {
      onSuccess: () => {
        // TODO: 성공 후 이동 or 토스트
        // navigate('/my-activities'); 내 체험관리
        console.log('체험 등록 성공', payload);
      },
      onError: (error) => {
        console.error('체험 등록 실패', error);
        // TODO: toast / alert 처리
        // 등록실패 다시 시도해주세요.
      },
    });
  };

  return (
    <ActivityForm
      mode='create'
      titleText='내 체험 등록'
      submitText='등록하기'
      isPending={isPending}
      uploadImage={uploadActivityImage}
      onSubmit={handleCreate}
    />
  );
}
