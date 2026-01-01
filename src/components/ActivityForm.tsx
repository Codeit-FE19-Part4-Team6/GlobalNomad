import { useEffect, useMemo, useState } from 'react';
import Label from '@/components/common/Label';
import Title from '@/components/common/Title';
import { BaseInput } from '@/components/common/input/BaseInput';
import TextArea from '@/components/common/TextArea';
// import Icons from '@/assets/icons';
// import ArrowDown from '@/assets/icons/page/arrow-down.svg';
// import Plus from '@/assets/icons/page/plus.svg';
// import Minus from '@/assets/icons/page/minus.svg';
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
import type { CreateActivityRequest } from '@/apis/type';

const MAX_BANNER = 1;
const MAX_INTRO = 4;

//문자열 시간을 받아서 숫자로 바꾸는 함수
//time을 받아서 " : " 기준으로 나눈다음 첫번째 인자를 리턴한다.
const toHour = (time: string) => Number(time.split(':')[0]);

// 00:00 ~ 23:00
//hour은 인덱스를 받아서 문자열로 바꾼다 대신에 두자리수여야 하고 한자리 수일경우 0을 채운다 ex) 09
//그러고 뒤에 :00을 붙여서 리턴한다 ex) 09:00
const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = String(i).padStart(2, '0');
  return `${hour}:00`;
});

//사용자가 draft에 입력하는 상태 값
//date가 옵셔널이 아니면 date초기값 필수
//등록 시 에는 date가 필수지만 입력상황에는 필수가 아니여서 옵셔널
type ScheduleDraft = {
  date?: Date;
  startTime: string;
  endTime: string;
};

//등록 시 draft를 초기화 하는 함수
//미리 만들어서 addScheduleFromDraft 함수에 넣어주기만 하면 된다.
const createDraft = (): ScheduleDraft => ({
  date: undefined,
  startTime: '00:00',
  endTime: '01:00',
});

export type ActivityFormInitialData = {
  title: string;
  category: string;
  content: string;
  price: number;
  address: string;
  rows: ScheduleRow[];
  bannerImageUrl: string;
  subImageUrls: string[];
};

type ActivityFormProps = {
  mode: 'create' | 'edit';

  // edit일 때 초기값 주입
  initialData?: ActivityFormInitialData;

  //부모 페이지에서 등록,수정 구분해서 처리
  onSubmit: (payload: CreateActivityRequest) => Promise<void> | void;

  //파일을 url스트링으로
  uploadImage: (file: File) => Promise<string>;

  // 페이지에서의 상태를 받아서 버튼 비활성화
  isPending?: boolean;

  // 버튼 문구
  submitText: string;

  // 타이틀 문구
  titleText: string;
};

export default function ActivityForm({
  mode,
  initialData,
  onSubmit,
  uploadImage,
  isPending = false,
  submitText,
  titleText,
}: ActivityFormProps) {
  const [category, setCategory] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [draft, setDraft] = useState<ScheduleDraft>(createDraft());
  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [title, setTitle] = useState('');

  const [bannerImages, setBannerImages] = useState<File[]>([]);
  const [introImages, setIntroImages] = useState<File[]>([]);

  const [existingBannerUrl, setExistingBannerUrl] = useState<string>('');
  const [existingSubImageUrls, setExistingSubImageUrls] = useState<string[]>([]);
  // 수정모드: 초기값 주입
  useEffect(() => {
    if (!initialData) {
      return;
    }

    setTitle(initialData.title ?? '');
    setCategory(initialData.category ?? '');
    setText(initialData.content ?? '');
    setPrice(String(initialData.price ?? ''));
    setAddress(initialData.address ?? '');
    setRows(initialData.rows ?? []);
    setExistingBannerUrl(initialData.bannerImageUrl ?? '');
    setExistingSubImageUrls(initialData.subImageUrls ?? []);
    // 이미지 File은 서버에서 바로 못 내려오니까(보통 URL임)
    // edit에서도 "새로 업로드"부터 작동하게 초기화
    setBannerImages([]);
    setIntroImages([]);

    setDraft(createDraft());
  }, [initialData]);

  // 유효성
  const isFormValid = useMemo(() => {
    return (
      title.trim() &&
      category &&
      text.trim() &&
      Number(price) > 0 &&
      address.trim() &&
      rows.length > 0
    );
  }, [title, category, text, price, address, rows.length]);

  // 이미지 add/remove
  const addBannerImage = (file: File) => {
    setBannerImages((prev) => {
      if (prev.length >= MAX_BANNER) {
        return prev;
      }
      return [...prev, file];
    });
  };

  const removeBannerImage = (index: number) => {
    setBannerImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addIntroImage = (file: File) => {
    setIntroImages((prev) => {
      if (prev.length >= MAX_INTRO) {
        return prev;
      }
      return [...prev, file];
    });
  };

  const removeIntroImage = (index: number) => {
    setIntroImages((prev) => prev.filter((_, i) => i !== index));
  };

  //사용자가 입력한 값을 담는 함수
  const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleClickCategory = (value: string) => {
    setCategory(value);
  };

  const onChangeText = (value: string) => {
    setText(value);
  };

  //draft에 사용자가 선택한 날짜를 담는 함수
  //세터함수에 이전값을 가져와서 date만 바꿔준다.
  // 굳이 selectedDate: Date 로 인수로 설정안하고 date로 해도 되지만 역할을 확실히 하기 위해
  const handleDraftDate = (selectedDate: Date) => {
    setDraft((prev) => ({ ...prev, date: selectedDate }));
  };

  //사용자가 선택한 값을 받아서 종료시간을 filter 하고 그 중 첫번째 인자를 고르는 함수
  //배열로 만들었던 시간들 중 사용자가 선택한 시간(nextStartTime) 보다 큰 값만 추출
  //추출 한 값중 첫 번째 인덱스를 종료시간에 담는다.
  //세터함수에 이전 값을 가져와서(date) 시작시간과 종료시간을 사용자가 지정함 값으로 바꾼다.
  const handleDraftStartTime = (nextStartTime: string) => {
    const nextEndOptions = TIME_OPTIONS.filter((t) => toHour(t) > toHour(nextStartTime));
    const nextEndTime = nextEndOptions[0] ?? nextStartTime;

    setDraft((prev) => ({
      ...prev,
      startTime: nextStartTime,
      endTime: nextEndTime,
    }));
  };

  // 종료시간을 직접 바꿨을 때 값 저장
  // 위에 코드는 시작시간을 바꾸면 종료시간을 시간시작 + 1시간인 값으로 바꿔주지만
  // handleDraftEndTime 사용자가 종료시간도 직접 선택했을때의 값을 저장
  const handleDraftEndTime = (nextEndTime: string) => {
    setDraft((prev) => ({ ...prev, endTime: nextEndTime }));
  };

  //date를 필수로 하기위해 조건문
  //setRows는 이전에 rows를 받고 새로운 row를 추가해서 새로운 배열을 만듦
  //서버에 post시 아직 서버의 id를 모르기 때문에 랜덤으로 구분하기 위한 아이디값 생성
  //date옆에 ! 는 타입스크립트에게 null, undefinded가 아니라는 확신을 준다.
  //위에 만들어 두었던 초기화 함수 실행
  const addScheduleFromDraft = () => {
    if (!draft.date) {
      return;
    }

    setRows((prevRows) => {
      const newRow: ScheduleRow = {
        uiId: crypto.randomUUID(),
        date: draft.date!,
        startTime: draft.startTime,
        endTime: draft.endTime,
      };
      return [...prevRows, newRow];
    });
    // 입력줄 초기화
    setDraft(createDraft());
  };

  //사용자가 선택한 값을 인자로 받아서 이전 rows값들 중
  //row.id와 사용자가 선택한 uiId가 같지 않은 것 들만 추출해서 새 배열로 만든다.
  //즉 사용자가 선택한 아이디만 삭제
  const removeRow = (uiId: string) => {
    setRows((prevRows) => prevRows.filter((row) => row.uiId !== uiId));
  };

  //  공통 submit
  // - 여기서 POST/PATCH 결정하지 않음
  // - payload 만들고 onSubmit(payload)만 호출
  const handleSubmit = async () => {
    if (!isFormValid || isPending) {
      return;
    }

    let bannerImageUrl = existingBannerUrl;
    const bannerFile = bannerImages[0];
    if (bannerFile) {
      bannerImageUrl = await uploadImage(bannerFile);
    }

    let subImageUrls = existingSubImageUrls;
    if (introImages.length > 0) {
      subImageUrls = await Promise.all(introImages.map((file) => uploadImage(file)));
    }

    const payload: CreateActivityRequest = {
      title,
      category,
      description: text,
      price: Number(price),
      address,
      schedules: mapRowsToScheduleRequests(rows),
      bannerImageUrl,
      subImageUrls,
    };

    await onSubmit(payload);
  };

  return (
    <div className='mx-auto flex w-full flex-col gap-7.5 px-6 md:w-175 md:px-7.5 lg:px-0'>
      <div className='flex flex-col gap-6'>
        <Title as='h3' className='font-xl-bold text-gray-950'>
          {titleText}
        </Title>

        {/* 제목 */}
        <div className='flex flex-col gap-2.5'>
          <Label className='font-lg-bold text-gray-950'>제목</Label>
          <BaseInput
            value={title}
            onChange={onChangeTitle}
            id='title'
            placeholder='제목을 입력해 주세요'
          />
        </div>

        {/* 카테고리 */}
        <div className='flex flex-col gap-2.5'>
          <Label className='font-lg-bold text-gray-950'>카테고리</Label>

          <Dropdown className='relative w-full'>
            <DropdownTrigger className='flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
              <span className={category ? 'text-gray-900' : 'text-gray-400'}>
                {category || '카테고리를 선택해 주세요'}
              </span>
              {/* <ArrowDown /> */}
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
        <div className='flex flex-col gap-2.5'>
          <Label className='font-lg-bold text-gray-950'>설명</Label>
          <TextArea
            value={text}
            onChange={onChangeText}
            variant='default'
            placeholder='설명을 입력해 주세요'
          />
        </div>

        {/* 가격 */}
        <div className='flex flex-col gap-2.5'>
          <Label className='font-lg-bold text-gray-950'>가격</Label>
          <BaseInput
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id='price'
            placeholder='체험 금액을 입력해 주세요'
          />
        </div>

        {/* 주소 */}
        <div className='flex flex-col gap-2.5'>
          <Label className='font-lg-bold text-gray-950'>주소</Label>
          <BaseInput
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id='address'
            placeholder='주소를 입력해 주세요'
          />
        </div>
      </div>

      {/* 예약 가능한 시간대 */}
      <div className='w-full'>
        <Title className='font-lg-bold mb-4.5 text-gray-950' as='h4'>
          예약 가능한 시간대
        </Title>

        <div className='flex flex-col gap-2.5'>
          <div className='hidden w-full grid-cols-[1fr_160px_200px_auto] items-end gap-4 sm:grid'>
            <Label className='font-lg-medium text-gray-950'>날짜</Label>
            <Label className='font-lg-medium text-gray-950'>시작 시간</Label>
            <Label className='font-lg-medium text-gray-950'>종료 시간</Label>
            <span />
          </div>

          <div className='flex flex-col gap-3 sm:grid sm:w-full sm:grid-cols-[1fr_160px_160px_auto] sm:items-center sm:gap-4'>
            <div className='flex items-end gap-3 sm:block'>
              <div className='flex-1'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>날짜</Label>
                <DatePicker value={draft.date} onChange={handleDraftDate} />
              </div>
            </div>

            <div className='grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2 sm:contents'>
              <div className='w-full sm:w-40'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>시작 시간</Label>
                <Dropdown className='relative w-full'>
                  <DropdownTrigger className='flex h-13.5 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
                    <span>{draft.startTime}</span>
                    {/* <ArrowDown /> */}
                  </DropdownTrigger>

                  <DropdownList className='absolute top-full left-0 z-50 mt-2 max-h-40 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
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

              <span className='mb-4 text-gray-400 sm:hidden'>-</span>

              <div className='w-full sm:w-40'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>종료 시간</Label>
                <Dropdown className='relative w-full'>
                  <DropdownTrigger className='flex h-13.5 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
                    <span>{draft.endTime}</span>
                    {/* <ArrowDown /> */}
                  </DropdownTrigger>

                  <DropdownList className='absolute top-full left-0 z-50 mt-2 max-h-40 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
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

              <div className='mb-1.5 shrink-0 sm:hidden'>
                <CircleButton variant='plus' onClick={addScheduleFromDraft} />
              </div>

              <div className='hidden sm:flex sm:justify-end'>
                <CircleButton variant='plus' onClick={addScheduleFromDraft} />
              </div>
            </div>
          </div>
        </div>

        <span className='border-grey-100 mt-5 mb-5 block w-full border-b' />

        {rows.map((row) => (
          <div
            key={row.uiId}
            className='mt-5 flex flex-col gap-3 sm:grid sm:w-full sm:grid-cols-[1fr_160px_160px_auto] sm:items-center sm:gap-4'>
            <div className='flex items-end gap-3 sm:block'>
              <div className='flex-1'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>날짜</Label>
                <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-700'>
                  {row.date.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>

            <div className='grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2 sm:contents'>
              <div className='w-full sm:w-40'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>시작 시간</Label>
                <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900'>
                  {row.startTime}
                </div>
              </div>

              <span className='mb-4 text-gray-400 sm:hidden'>-</span>

              <div className='w-full sm:w-40'>
                <Label className='font-lg-medium text-gray-950 sm:hidden'>종료 시간</Label>
                <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900'>
                  {row.endTime}
                </div>
              </div>

              <div className='hidden sm:flex sm:justify-end'>
                <CircleButton
                  variant='minus'
                  // icon={<Minus />}
                  onClick={() => removeRow(row.uiId)}
                />
              </div>

              <div className='mb-1.5 shrink-0 sm:hidden'>
                <CircleButton
                  variant='minus'
                  // icon={<Minus />}
                  onClick={() => removeRow(row.uiId)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 배너 이미지 */}
      <div className='flex flex-col gap-2.5'>
        <Label>
          <span className='font-lg-bold text-gray-950'>배너 이미지 등록</span>
        </Label>
        <BannerImageSection
          images={bannerImages}
          maxFiles={MAX_BANNER}
          onAdd={addBannerImage}
          onRemove={removeBannerImage}
        />
      </div>

      {/* 소개 이미지 */}
      <div className='flex flex-col gap-2.5'>
        <Label>
          <span className='font-lg-bold text-gray-950'>소개 이미지 등록</span>
        </Label>
        <IntroImageSection
          images={introImages}
          maxFiles={MAX_INTRO}
          onAdd={addIntroImage}
          onRemove={removeIntroImage}
        />
      </div>

      {/* 제출 버튼 */}
      <div className='mb-7.5 flex justify-center md:mb-13.25 lg:mb-26.5'>
        <PrimaryButton
          disabled={!isFormValid || isPending}
          onClick={handleSubmit}
          className='font-md-bold h-10.25 w-30'>
          {isPending ? (mode === 'create' ? '등록 중...' : '수정 중...') : submitText}
        </PrimaryButton>
      </div>
    </div>
  );
}
