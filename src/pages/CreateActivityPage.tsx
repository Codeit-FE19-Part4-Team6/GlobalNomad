import ActivityForm, { type ActivityFormValues } from '@/components/ActivityForm';
import type { CreateActivityRequest } from '@/apis/type';
import { useCreateActivity } from '@/hooks/useCreateActivity';
import { uploadActivityImage } from '@/apis/uploadActivityImage';
import { mapRowsToScheduleRequests } from '@/libs/mapper/activity';
// import { isAxiosError } from 'axios'; //등록 후 에러처리용
// import { useNavigate } from 'react-router-dom'; //등록 후 내 체험관리로 이동
export default function CreateActivityPage() {
  const { mutate, isPending } = useCreateActivity();

  const handleCreate = async (values: ActivityFormValues) => {
    try {
      // 배너 업로드
      let bannerImageUrl = '';
      if (values.bannerFile) {
        bannerImageUrl = await uploadActivityImage(values.bannerFile);
      }

      const subImageUrls =
        values.introFiles.length > 0
          ? await Promise.all(values.introFiles.map(uploadActivityImage))
          : [];

      // Create payload 생성
      const payload: CreateActivityRequest = {
        title: values.title,
        category: values.category,
        description: values.description,
        price: values.price,
        address: values.address,
        schedules: mapRowsToScheduleRequests(values.rows),
        bannerImageUrl,
        subImageUrls,
      };

      // 3) 서버 요청
      mutate(payload, {
        onSuccess: () => {
          console.log('체험 등록 성공', payload);
          // TODO: navigate('/my-activities'), 토스트 등록성공
        },
        onError: (error) => {
          console.error('체험 등록 실패', error);
          // TODO: toast 등록실패 토스트
        },
      });
    } catch (e) {
      console.error('이미지 업로드/등록 처리 중 실패:', e);
      alert('등록에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <ActivityForm
      mode='create'
      titleText='내 체험 등록'
      submitText='등록하기'
      isPending={isPending}
      onSubmit={handleCreate}
    />
  );
}
