// src/pages/activities/CreateActivityPage.tsx
import ActivityForm from '@/components/ActivityForm';
import type { CreateActivityRequest } from '@/apis/type';
import { useCreateActivity } from '@/hooks/useCreateActivity';
import { uploadActivityImage } from '@/apis/uploadActivityImage';

export default function CreateActivityPage() {
  const { mutate, isPending } = useCreateActivity();

  // ✅ ActivityForm에서 만들어 준 payload를 그대로 POST
  const handleCreate = async (payload: CreateActivityRequest) => {
    mutate(payload, {
      onSuccess: () => {
        // TODO: 성공 후 이동 or 토스트
        // navigate('/my-activities');
        console.log('체험 등록 성공', payload);
      },
      onError: (error) => {
        console.error('체험 등록 실패', error);
        // TODO: toast / alert 처리
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
