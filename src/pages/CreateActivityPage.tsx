import ActivityForm, { type ActivityFormValues } from '@/components/ActivityForm';
import type { CreateActivityRequest } from '@/apis/type';
import { useCreateActivity } from '@/hooks/useCreateActivity';
import { uploadActivityImage } from '@/apis/uploadActivityImage';
import CancelReservationModal from '@/components/common/modal/CancelReservationModal';
import { useState, useEffect, useRef } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useSnackBar } from '@/providers/SnackBarProvider';

export default function CreateActivityPage() {
  const { mutate, isPending } = useCreateActivity();
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  const [leaveOpen, setLeaveOpen] = useState(false);
  const ignoreBlockOnceRef = useRef(false);
  const { showSnack } = useSnackBar();

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (ignoreBlockOnceRef.current) {
      return false;
    }

    if (!isDirty) {
      return false;
    }

    if (currentLocation.pathname === nextLocation.pathname) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (blocker.state !== 'blocked') {
      return;
    }

    // ✅ 저장 후 이동으로 생긴 block은 모달 띄우지 않음
    // if (ignoreBlockOnceRef.current) {
    //   // 1회만 무시하고 바로 원복
    //   ignoreBlockOnceRef.current = false;
    //   return;
    // }

    setLeaveOpen(true);
  }, [blocker.state]);

  const handleLeaveNo = () => {
    setLeaveOpen(false);
    if (blocker.state === 'blocked') {
      blocker.reset(); // 여기서는 안전
    }
  };

  const handleLeaveYes = async () => {
    setLeaveOpen(false);

    if (blocker.state !== 'blocked') {
      return;
    }

    ignoreBlockOnceRef.current = true;
    blocker.proceed();
  };

  const handleCreate = async (values: ActivityFormValues) => {
    try {
      // 이미지 업로드
      const bannerImageUrl = values.bannerFile ? await uploadActivityImage(values.bannerFile) : '';

      const subImageUrls =
        values.introFiles.length > 0
          ? await Promise.all(values.introFiles.map(uploadActivityImage))
          : [];

      //schedules 변환 (공통폼 rows -> 서버 요청 형식)
      //row.date가 Date 객체라서 { date: "YYYY-MM-DD", startTime: "HH:mm", endTime: "HH:mm" }
      //toISOString() 하면 "2026-01-02T00:00:00.000Z" 이런 문자열이 됨
      //split('T')[0] 하면 "2026-01-02"만 뽑음
      // 서버가 원하는 날짜 형식 완성
      const schedules = values.rows.map((row) => {
        const d = row.date;

        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');

        return {
          date: `${yyyy}-${mm}-${dd}`,
          startTime: row.startTime,
          endTime: row.endTime,
        };
      });

      // 3) 최종 payload
      const payload: CreateActivityRequest = {
        title: values.title,
        category: values.category,
        description: values.description,
        price: values.price,
        address: values.address,
        schedules,
        bannerImageUrl,
        subImageUrls,
      };

      // 4) mutate
      mutate(payload, {
        onSuccess: () => {
          showSnack('체험이 등록되었습니다.', 'success', {
            duration: 2000,
          });
          //ignoreBlockOnceRef.current = true;
          Object.keys(localStorage)
            .filter((k) => k.startsWith('draft:createActivity'))
            .forEach((k) => localStorage.removeItem(k));

          setIsDirty(false);

          setTimeout(() => {
            navigate('/mypage?tab=experiences');
          }, 1500);
        },
        onError: (error) => {
          if (!isAxiosError(error)) {
            showSnack('체험이 등록이 실패했습니다..', 'error', {
              duration: 2000,
            });
            return;
          }

          const status = error.response?.status;
          const serverMessage = (error.response?.data as { message?: string })?.message;

          if (status === 401) {
            alert('권한이 없습니다. 다시 로그인 해주세요');
          }

          if (status === 400 || status === 409) {
            alert(serverMessage ?? '요청 처리 중 오류가 발생했습니다');
            return;
          }
          alert('알 수 없는 오류가 발생했습니다.');
        },
      });
    } catch (e) {
      console.error('등록 처리 중 실패:', e);
      alert('등록에 실패했어요. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <ActivityForm
        mode='create'
        titleText='내 체험 등록'
        submitText='등록하기'
        isPending={isPending}
        onSubmit={handleCreate}
        onDirtyChange={setIsDirty}
      />

      <CancelReservationModal
        isOpen={leaveOpen && blocker.state === 'blocked'}
        onClose={handleLeaveNo}
        onConfirm={handleLeaveYes}
        cancelText='아니오'
        confirmText='네'>
        저장되지 않았습니다.
        <br />
        정말 뒤로 가시겠습니까?
      </CancelReservationModal>
    </>
  );
}
