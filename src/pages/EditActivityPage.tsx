import ActivityForm from '@/components/ActivityForm';
import type { ActivityFormInitialData, ActivityFormValues } from '@/components/ActivityForm';
import { useGetActivityDetail } from '@/hooks/useEditActivity';
import { usePatchActivity } from '@/hooks/usePatchActivity';
import { uploadActivityImage } from '@/apis/uploadActivityImage';
import type { ActivityCategory, MyActivityEditRequest } from '@/apis/type';
import NotFoundPage from '@/pages/NotFoundPage';
import { isAxiosError } from 'axios';
import CancelReservationModal from '@/components/common/modal/CancelReservationModal';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams, useBlocker } from 'react-router-dom';
import { useSnackBar } from '@/providers/SnackBarProvider';
export default function EditActivityPage() {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const id = activityId ? Number(activityId) : undefined;

  const { data, isLoading, isError } = useGetActivityDetail(id);
  const { mutate: patchMutate, isPending } = usePatchActivity(id ?? 0);
  const [isDirty, setIsDirty] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const ignoreBlockOnceRef = useRef(false);
  const { showSnack } = useSnackBar();
  const pendingLocationRef = useRef<string | null>(null);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (ignoreBlockOnceRef.current) {
      return false;
    }
    if (!isDirty) {
      return false;
    }

    // pathname만 비교하면 query가 바뀌는 이동도 "같은 경로"로 취급될 수 있어서
    // search까지 합쳐서 비교하는게 안전
    const curr = currentLocation.pathname + currentLocation.search;
    const next = nextLocation.pathname + nextLocation.search;

    if (curr === next) {
      return false;
    }

    // ✅ “어디로 가려고 했는지” 저장 (뒤로/앞으로도 결국 nextLocation이 있음)
    pendingLocationRef.current = next;

    return true; // 이동 막기
  });

  useEffect(() => {
    if (blocker.state !== 'blocked') {
      return;
    }

    // ✅ 저장 후 이동으로 생긴 block은 모달 띄우지 않음
    if (ignoreBlockOnceRef.current) {
      // 1회만 무시하고 바로 원복
      ignoreBlockOnceRef.current = false;
      return;
    }

    setLeaveOpen(true);
  }, [blocker.state]);

  const handleLeaveNo = () => {
    setLeaveOpen(false);
    blocker.reset?.();
  };

  const handleLeaveYes = () => {
    setLeaveOpen(false);

    // ✅ 다음 내비게이션은 막지 않도록(한 번만)
    ignoreBlockOnceRef.current = true;

    // ✅ 변경사항 없다고 처리(다음 이동에서 blocker 조건을 꺼버림)
    setIsDirty(false);

    // ✅ 라우터 blocked 상태 해제 (이거 안 하면 먹통처럼 남는 케이스가 있음)
    blocker.reset?.();

    // ✅ 저장해둔 목적지로 이동
    const next = pendingLocationRef.current;
    if (next) {
      navigate(next, { replace: true });
      pendingLocationRef.current = null;
    } else {
      // 혹시 모를 fallback
      navigate(-1);
    }
  };

  const initialData: ActivityFormInitialData | undefined = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      title: data.title ?? '',
      category: data.category as ActivityCategory,
      description: data.description ?? '',
      price: data.price ?? 0,
      address: data.address ?? '',
      rows: data.schedules.map((s) => ({
        uiId: String(s.id),
        date: new Date(`${s.date}T00:00:00`),
        startTime: s.startTime,
        endTime: s.endTime,
        serverTimeId: s.id,
      })),
      bannerImageUrl: data.bannerImageUrl ?? '',
      subImageUrls: (data.subImages ?? []).map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
      })),
    };
  }, [data]);

  // id 자체가 잘못된 경우 (NaN 포함) -> 404
  if (!id || Number.isNaN(id) || id <= 0) {
    return <NotFoundPage />;
  }

  // 로딩/에러 처리
  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError || !data) {
    return <NotFoundPage />;
  }

  /**
   * ✅ 수정 submit: 공통폼 values -> PATCH payload 생성 + API 호출
   */
  const handleEdit = async (values: ActivityFormValues) => {
    try {
      // 배너: 새 파일이 있으면 업로드, 없으면 기존 URL 유지
      const bannerImageUrl = values.bannerFile
        ? await uploadActivityImage(values.bannerFile)
        : values.existingBannerUrl;

      // 소개 이미지: 새로 추가한 것만 업로드해서 "추가" 목록으로 보냄
      const subImageUrlsToAdd =
        values.introFiles.length > 0
          ? await Promise.all(values.introFiles.map(uploadActivityImage))
          : [];

      // schedules add/remove 계산
      // 서버에서 준 스케줄 아이디
      const originalIds = data.schedules.map((s) => s.id);

      const currentServerIds = values.rows
        .map((r: any) => r.serverTimeId)
        .filter((v: any) => typeof v === 'number') as number[]; //number 만

      // 원래는 있었는데 지금은 없는 것들 = 삭제 대상
      //
      const scheduleIdsToRemove = originalIds.filter((sid) => !currentServerIds.includes(sid));

      // 지금 rows 중 serverTimeId 없는 것들 = 새로 추가한 스케줄
      const schedulesToAdd = values.rows
        .filter((r: any) => !r.serverTimeId)
        .map((r) => ({
          date: r.date.toISOString().split('T')[0],
          startTime: r.startTime,
          endTime: r.endTime,
        }));

      // 4) 최종 PATCH payload
      const payload: MyActivityEditRequest = {
        title: values.title,
        category: values.category,
        description: values.description,
        price: values.price,
        address: values.address,
        bannerImageUrl,

        subImageIdsToRemove: values.removedSubImageIds,
        subImageUrlsToAdd: subImageUrlsToAdd,

        scheduleIdsToRemove: scheduleIdsToRemove as any,
        schedulesToAdd: schedulesToAdd as any,
      };

      // 5) PATCH
      patchMutate(payload, {
        onSuccess: () => {
          showSnack('체험이 수정되었습니다.', 'success', {
            duration: 2000,
          });

          // ✅ 이번 이동은 모달 무시 (즉시 반영되는 ref 사용)
          ignoreBlockOnceRef.current = true;

          setIsDirty(false);
          setTimeout(() => {
            navigate('/mypage?tab=experiences');
          }, 1500);
        },

        onError: (e) => {
          // ✅ 여기서부터 "에러 메시지 처리"를 onError 안에 직접 작성
          if (!isAxiosError(e)) {
            showSnack('체험이 수정이 실패했습니다.', 'error', {
              duration: 2000,
            });
            return;
          }

          const status = e.response?.status;
          const serverMessage = (e.response?.data as { message?: string })?.message;

          // 401: 고정 문구
          if (status === 401) {
            alert('권한이 없습니다. 다시 로그인해주세요.');
            return;
          }

          // 400 / 403 / 404 / 409: 서버 message 그대로 (스웨거 명세)
          if (status === 400 || status === 403 || status === 404 || status === 409) {
            alert(serverMessage ?? '요청 처리 중 오류가 발생했습니다.');
            return;
          }

          // 나머지
          alert(serverMessage ?? '요청 처리 중 오류가 발생했습니다.');
        },
      });
    } catch (e) {
      console.log('❌ edit preprocess error:', e);
      alert('수정 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <ActivityForm
        mode='edit'
        titleText='내 체험 수정'
        submitText='수정하기'
        isPending={isPending}
        initialData={initialData}
        onSubmit={handleEdit}
        onDirtyChange={setIsDirty}
      />

      <CancelReservationModal
        isOpen={leaveOpen}
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
