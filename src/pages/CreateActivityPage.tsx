import { useState } from 'react';
import Label from '@/components/common/Label';
import Title from '@/components/common/Title';
import { BaseInput } from '@/components/common/input/BaseInput';
import TextArea from '@/components/common/TextArea';
import Icons from '@/assets/icons';
import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import DropdownItem from '@/components/common/dropdown/DropdownItem';
import { DatePicker } from '@/components/common/DatePicker';
import { CircleButton } from '@/components/common/button/CircleButton';
import { PrimaryButton } from '@/components/common/button';
import BannerImageSection from '@/components/common/image-upload/BannerImageSection';
import IntroImageSection from '@/components/common/image-upload/IntroImageSection';
import type { ScheduleRow } from '@/types/ScheduleRow';
import { mapRowsToScheduleRequests } from '@/libs/mapper/activity';
import type { createdActivityRequest } from '@/types/activityRequest';
import { useCreateActivity } from '@/hooks/useCreateActivity';
import { isAxiosError } from 'axios';
// import { useNavigate } from 'react-router-dom';
/**
 * time 비교용 함수
 * "02:00" -> 2
 */
const toHour = (time: string) => {
  return Number(time.split(':')[0]);
};

/**
 * ✅ 00:00 ~ 23:00 옵션(24개) 만들기
 */
const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = String(i).padStart(2, '0');
  return `${hour}:00`;
});

/**
 * ✅ "입력줄(맨 위)" 상태 타입
 * - 이 값들은 + 누르기 전까진 rows에 들어가지 않는다.
 */
type ScheduleDraft = {
  date?: Date;
  startTime: string;
  endTime: string;
};

/**
 * ✅ "아래에 쌓이는 목록" 한 줄 타입
 * - rows는 실제로 쌓인 결과들
 */

/**
 * ✅ 입력줄 초기값 생성 함수
 * + 누른 뒤 입력줄을 초기화할 때도 재사용
 */
const createDraft = (): ScheduleDraft => {
  return {
    date: undefined,
    startTime: '00:00',
    endTime: '01:00',
  };
};

export default function CreateActivityPage() {
  const [category, setCategory] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [draft, setDraft] = useState<ScheduleDraft>(createDraft());
  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [title, setTitle] = useState('');
  const { mutate, isPending } = useCreateActivity();
  // const navigate = useNavigate();
  const handleSubmit = async () => {
    const payload: createdActivityRequest = {
      title,
      category,
      content: text, // 너는 설명 state가 text니까 content에 text 넣기
      price: Number(price),
      address,
      schedules: mapRowsToScheduleRequests(rows),
      bannerImageUrl: [],
      introImageUrls: [],
    };

    mutate(payload, {
      onSuccess: () => {
        // 1️⃣ 성공 알림
        alert('체험이 등록되었습니다');

        // 2️⃣ 생성된 체험 상세 페이지로 이동
        // navigate(`/activities/${data.id}`);
        console.log(payload);
      },

      onError: (error) => {
        if (isAxiosError(error)) {
          alert(error.response?.data?.message ?? '서버 오류');
        } else {
          alert('알 수 없는 오류가 발생했습니다');
        }
      },
    });
  };
  const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleClickCategory = (value: string) => {
    setCategory(value);
  };

  const onChangeText = (value: string) => {
    setText(value);
  };

  // ----------------------------
  // (3) draft(입력줄) 핸들러들
  // ----------------------------

  // ✅ 날짜 선택
  const handleDraftDate = (selectedDate: Date) => {
    setDraft((prev) => {
      return {
        ...prev,
        date: selectedDate,
      };
    });
  };

  /**
   * ✅ 시작시간 선택
   * - 종료시간은 "시작시간보다 큰 값" 중 첫 번째로 자동 보정
   */
  const handleDraftStartTime = (nextStartTime: string) => {
    const nextEndOptions = TIME_OPTIONS.filter((t) => toHour(t) > toHour(nextStartTime));
    const nextEndTime = nextEndOptions[0] ?? nextStartTime;

    setDraft((prev) => {
      return {
        ...prev,
        startTime: nextStartTime,
        endTime: nextEndTime,
      };
    });
  };

  // ✅ 종료시간 선택
  const handleDraftEndTime = (nextEndTime: string) => {
    setDraft((prev) => {
      return {
        ...prev,
        endTime: nextEndTime,
      };
    });
  };

  const addScheduleFromDraft = () => {
    // ✅ 날짜를 선택 안 했으면 추가하지 않음 (필수 조건)
    if (!draft.date) {
      return;
    }

    setRows((prevRows) => {
      const newRow: ScheduleRow = {
        uiId: crypto.randomUUID(),
        date: draft.date!, // 위에서 체크했으니 ! 가능
        startTime: draft.startTime,
        endTime: draft.endTime,
      };

      return [...prevRows, newRow];
    });

    // ✅ 입력줄 초기화
    setDraft(createDraft());
  };

  /**
   * ✅ - 버튼
   * - 선택한 줄(row)만 삭제
   */
  const removeRow = (uiId: string) => {
    setRows((prevRows) => {
      return prevRows.filter((row) => row.uiId !== uiId);
    });
  };

  // ----------------------------
  // (5) 렌더
  // ----------------------------
  return (
    <div className='mx-auto flex w-full flex-col gap-[30px] px-[24px] md:w-[700px] md:px-[30px] lg:px-[0px]'>
      <div className='flex flex-col gap-[24px]'>
        <Title as='h3' className='font-xl-bold text-gray-950'>
          내 체험등록
        </Title>

        {/* 제목 */}
        <div className='flex flex-col gap-[10px]'>
          <Label className='font-lg-bold text-gray-950'>제목</Label>
          <BaseInput onChange={onChangeTitle} id='title' placeholder='제목을 입력해 주세요' />
        </div>

        {/* 카테고리 */}
        <div className='flex flex-col gap-[10px]'>
          <Label className='font-lg-bold text-gray-950'>카테고리</Label>

          <Dropdown className='relative w-full'>
            <DropdownTrigger className='flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
              <span className={category ? 'text-gray-900' : 'text-gray-400'}>
                {category || '카테고리를 선택해 주세요'}
              </span>
              <Icons.ArrowDown />
            </DropdownTrigger>

            <DropdownList className='absolute top-full left-0 z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
              {['문화·예술', '식음료', '투어', '관광', '웰빙'].map((c) => (
                <DropdownItem
                  key={c}
                  onClick={() => handleClickCategory(c)}
                  className='rounded-lg px-3 py-2 hover:bg-gray-50'>
                  {c}
                </DropdownItem>
              ))}
            </DropdownList>
          </Dropdown>
        </div>

        {/* 설명 */}
        <div className='flex flex-col gap-[10px]'>
          <Label className='font-lg-bold text-gray-950'>설명</Label>
          <TextArea
            value={text}
            onChange={onChangeText}
            variant='default'
            placeholder='설명을 입력해 주세요'
          />
        </div>

        {/* 가격 */}
        <div className='flex flex-col gap-[10px]'>
          <Label className='font-lg-bold text-gray-950'>가격</Label>
          <BaseInput
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id='price'
            placeholder='체험 금액을 입력해 주세요'
          />
        </div>

        {/* 주소 */}
        <div className='flex flex-col gap-[10px]'>
          <Label className='font-lg-bold text-gray-950'>주소</Label>
          <BaseInput
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id='address'
            placeholder='주소를 입력해 주세요'
          />
        </div>
      </div>

      {/* ----------------------------
          ✅ 예약 가능한 시간대
          ---------------------------- */}
      {/* ----------------------------
    ✅ 예약 가능한 시간대
    ---------------------------- */}
      <div className='w-full'>
        <Title className='font-lg-bold mb-[18px] text-gray-950' as='h4'>
          예약 가능한 시간대
        </Title>

        <div className='flex flex-col gap-[10px]'>
          {/* ✅ 헤더: 모바일에서 숨기고(sm 이상에서만 보이기) */}
          <div className='hidden w-full grid-cols-[1fr_160px_200px_auto] items-end gap-4 sm:grid'>
            <Label className='font-lg-medium text-gray-950'>날짜</Label>
            <Label className='font-lg-medium text-gray-950'>시작 시간</Label>
            <Label className='font-lg-medium text-gray-950'>종료 시간</Label>
            <span />
          </div>

          {/* ✅ 입력줄(draft)
        - 모바일: 2줄 구조
        - sm 이상: 기존 grid 한 줄 구조 유지
    */}
          <div className='flex flex-col gap-3 sm:grid sm:w-full sm:grid-cols-[1fr_160px_160px_auto] sm:items-center sm:gap-4'>
            {/* (1) 날짜 + (+버튼) */}
            <div className='flex items-end gap-3 sm:block'>
              <div className='flex-1'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>날짜</Label>
                <DatePicker value={draft.date} onChange={handleDraftDate} />
              </div>

              {/* + 버튼: 모바일에서는 날짜 줄 옆에, sm 이상에서는 원래 자리로 */}
            </div>

            {/* (2) 시작/종료 (모바일에서 가로로 한 줄) */}
            <div className='grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2 sm:contents'>
              {/* 시작 시간 */}
              <div className='w-full sm:w-[160px]'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>시작 시간</Label>
                <Dropdown className='relative w-full'>
                  <DropdownTrigger className='flex h-[54px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
                    <span>{draft.startTime}</span>
                    <Icons.ArrowDown />
                  </DropdownTrigger>

                  <DropdownList className='absolute top-full left-0 z-50 mt-2 max-h-[160px] w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
                    {TIME_OPTIONS.map((time) => (
                      <DropdownItem
                        key={time}
                        onClick={() => handleDraftStartTime(time)}
                        className='rounded-lg px-3 py-2 hover:bg-gray-50'>
                        {time}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </div>

              {/* 가운데 ~ */}
              <span className='mb-[16px] text-gray-400 sm:hidden'>-</span>

              {/* 종료 시간 */}
              <div className='w-full sm:w-[160px]'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>종료 시간</Label>
                <Dropdown className='relative w-full'>
                  <DropdownTrigger className='flex h-[54px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
                    <span>{draft.endTime}</span>
                    <Icons.ArrowDown />
                  </DropdownTrigger>

                  <DropdownList className='absolute top-full left-0 z-50 mt-2 max-h-[160px] w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
                    {TIME_OPTIONS.filter((t) => toHour(t) > toHour(draft.startTime)).map((time) => (
                      <DropdownItem
                        key={time}
                        onClick={() => handleDraftEndTime(time)}
                        className='rounded-lg px-3 py-2 hover:bg-gray-50'>
                        {time}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </div>
              {/* ✅ 모바일에서 + 버튼은 시간 옆 */}
              <div className='mb-[6px] shrink-0 sm:hidden'>
                <CircleButton variant='plus' onClick={addScheduleFromDraft} />
              </div>

              {/* ✅ sm 이상에서만 보이는 + 버튼 자리(원래대로) */}
              <div className='hidden sm:flex sm:justify-end'>
                <CircleButton variant='plus' onClick={addScheduleFromDraft} />
              </div>
            </div>
          </div>
        </div>

        <span className='border-grey-100 mt-[20px] mb-[20px] block w-full border-b' />

        {/* ✅ 아래 목록(rows)
      - 모바일: 2줄 구조 + (- 버튼은 날짜 줄 오른쪽)
      - sm 이상: 기존 grid 한 줄
  */}
        {rows.map((row) => (
          <div
            key={row.uiId}
            className='mt-5 flex flex-col gap-3 sm:grid sm:w-full sm:grid-cols-[1fr_160px_160px_auto] sm:items-center sm:gap-4'>
            {/* 날짜 + (-버튼) */}
            <div className='flex items-end gap-3 sm:block'>
              <div className='flex-1'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>날짜</Label>
                <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-700'>
                  {row.date.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>

            {/* 시작/종료 */}
            <div className='grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2 sm:contents'>
              <div className='w-full sm:w-[160px]'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>시작 시간</Label>
                <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900'>
                  {row.startTime}
                </div>
              </div>

              <span className='mb-[16px] text-gray-400 sm:hidden'>-</span>

              <div className='w-full sm:w-[160px]'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>종료 시간</Label>
                <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900'>
                  {row.endTime}
                </div>
              </div>

              {/* ✅ sm 이상에서는 원래 자리의 - 버튼 */}
              <div className='hidden sm:flex sm:justify-end'>
                <CircleButton variant='minus' onClick={() => removeRow(row.uiId)} />
              </div>

              {/* - 버튼: 모바일에서는 날짜 옆 */}
              <div className='mb-[6px] shrink-0 sm:hidden'>
                <CircleButton variant='minus' onClick={() => removeRow(row.uiId)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-[10px]'>
        <Label>
          <span className='font-lg-bold text-gray-950'>배너 이미지 등록</span>
        </Label>
        <BannerImageSection />
      </div>
      <div className='flex flex-col gap-[10px]'>
        <Label>
          <span className='font-lg-bold text-gray-950'>소개 이미지 등록</span>
        </Label>
        <IntroImageSection />
      </div>
      <div className='mb-[30px] flex justify-center md:mb-[53px] lg:mb-[106px]'>
        <PrimaryButton onClick={handleSubmit} className='font-md-bold h-[41px] w-[120px]'>
          {isPending ? '등록 중...' : '등록하기'}
        </PrimaryButton>
      </div>
    </div>
  );
}
