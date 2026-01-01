// import { useState } from 'react';
// import Label from '@/components/common/Label';
// import Title from '@/components/common/Title';
// import { BaseInput } from '@/components/common/input/BaseInput';
// import TextArea from '@/components/common/TextArea';
// import Icons from '@/assets/icons';
// import Dropdown from '@/components/common/dropdown/Dropdown';
// import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
// import DropdownList from '@/components/common/dropdown/DropdownList';
// import DropdownItem from '@/components/common/dropdown/DropdownItem';
// import { DatePicker } from '@/components/common/DatePicker';
// import { CircleButton } from '@/components/common/button/CircleButton';
// import { PrimaryButton } from '@/components/common/button';
// import BannerImageSection from '@/components/common/image-upload/BannerImageSection';
// import IntroImageSection from '@/components/common/image-upload/IntroImageSection';
// import type { ScheduleRow } from '@/types/ScheduleRow';
// import { mapRowsToScheduleRequests } from '@/libs/mapper/activity';
// import type { createdActivityRequest } from '@/types/activityRequest';
// import { useCreateActivity } from '@/hooks/useCreateActivity';
// import { isAxiosError } from 'axios';
// // import { useNavigate } from 'react-router-dom';

// //문자열 시간을 받아서 숫자로 바꾸는 함수
// //time을 받아서 " : " 기준으로 나눈다음 첫번째 인자를 리턴한다.
// const toHour = (time: string) => {
//   return Number(time.split(':')[0]);
// };

// // 00:00 ~ 23:00
// //hour은 인덱스를 받아서 문자열로 바꾼다 대신에 두자리수여야 하고 한자리 수일경우 0을 채운다 ex) 09
// //그러고 뒤에 :00을 붙여서 리턴한다 ex) 09:00
// const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
//   const hour = String(i).padStart(2, '0');
//   return `${hour}:00`;
// });

// //사용자가 draft에 입력하는 상태 값
// //date가 옵셔널이 아니면 date초기값 필수
// //등록 시 에는 date가 필수지만 입력상황에는 필수가 아니여서 옵셔널
// type ScheduleDraft = {
//   date?: Date;
//   startTime: string;
//   endTime: string;
// };

// //등록 시 draft를 초기화 하는 함수
// //미리 만들어서 addScheduleFromDraft 함수에 넣어주기만 하면 된다.
// const createDraft = (): ScheduleDraft => {
//   return {
//     date: undefined,
//     startTime: '00:00',
//     endTime: '01:00',
//   };
// };

// export default function CreateActivityPage() {
//   const [category, setCategory] = useState<string>('');
//   const [text, setText] = useState<string>('');
//   const [price, setPrice] = useState('');
//   const [address, setAddress] = useState('');
//   const [draft, setDraft] = useState<ScheduleDraft>(createDraft());
//   const [rows, setRows] = useState<ScheduleRow[]>([]);
//   const [title, setTitle] = useState('');
//   const { mutate, isPending } = useCreateActivity();
//   // const navigate = useNavigate();

//   //서버로 데이터를 보내는 함수
//   //payload는 보내는 data를 서버가 읽기 좋게 바꾼 형태
//   //성공 시 onSuccess 실패 시 onError
//   const handleSubmit = async () => {
//     const payload: createdActivityRequest = {
//       title,
//       category,
//       content: text, // 너는 설명 state가 text니까 content에 text 넣기
//       price: Number(price),
//       address,
//       schedules: mapRowsToScheduleRequests(rows),
//       bannerImageUrl: [],
//       introImageUrls: [],
//     };

//     mutate(payload, {
//       onSuccess: () => {
//         // 1️⃣ 성공 알림
//         alert('체험이 등록되었습니다');

//         // 2️⃣ 생성된 체험 상세 페이지로 이동
//         // navigate(`/activities/${data.id}`);
//         console.log(payload);
//       },

//       onError: (error) => {
//         if (isAxiosError(error)) {
//           alert(error.response?.data?.message ?? '서버 오류');
//         } else {
//           alert('알 수 없는 오류가 발생했습니다');
//         }
//       },
//     });
//   };

//   //사용자가 입력한 값을 담는 함수
//   const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleClickCategory = (value: string) => {
//     setCategory(value);
//   };

//   const onChangeText = (value: string) => {
//     setText(value);
//   };

//   //draft에 사용자가 선택한 날짜를 담는 함수
//   //세터함수에 이전값을 가져와서 date만 바꿔준다.
//   // 굳이 selectedDate: Date 로 인수로 설정안하고 date로 해도 되지만 역할을 확실히 하기 위해
//   const handleDraftDate = (selectedDate: Date) => {
//     setDraft((prev) => {
//       return {
//         ...prev,
//         date: selectedDate,
//       };
//     });
//   };

//   //사용자가 선택한 값을 받아서 종료시간을 filter 하고 그 중 첫번째 인자를 고르는 함수
//   //배열로 만들었던 시간들 중 사용자가 선택한 시간(nextStartTime) 보다 큰 값만 추출
//   //추출 한 값중 첫 번째 인덱스를 종료시간에 담는다.
//   //세터함수에 이전 값을 가져와서(date) 시작시간과 종료시간을 사용자가 지정함 값으로 바꾼다.
//   const handleDraftStartTime = (nextStartTime: string) => {
//     const nextEndOptions = TIME_OPTIONS.filter((t) => toHour(t) > toHour(nextStartTime));
//     const nextEndTime = nextEndOptions[0] ?? nextStartTime;

//     setDraft((prev) => {
//       return {
//         ...prev,
//         startTime: nextStartTime,
//         endTime: nextEndTime,
//       };
//     });
//   };

//   // 종료시간을 직접 바꿨을 때 값 저장
//   // 위에 코드는 시작시간을 바꾸면 종료시간을 시간시작 + 1시간인 값으로 바꿔주지만
//   // handleDraftEenTime 사용자가 종료시간도 직접 선택했을때의 값을 저장
//   const handleDraftEndTime = (nextEndTime: string) => {
//     setDraft((prev) => {
//       return {
//         ...prev,
//         endTime: nextEndTime,
//       };
//     });
//   };

//   //date를 필수로 하기위해 조건문
//   //setRows는 이전에 rows를 받고 새로운 row를 추가해서 새로운 배열을 만듦
//   //서버에 post시 아직 서버의 id를 모르기 때문에 랜덤으로 구분하기 위한 아이디값 생성
//   //date옆에 ! 는 타입스크립트에게 null, undefinded가 아니라는 확신을 준다.
//   //위에 만들어 두었던 초기화 함수 실행
//   const addScheduleFromDraft = () => {
//     // ✅ 날짜를 선택 안 했으면 추가하지 않음 (필수 조건)
//     if (!draft.date) {
//       return;
//     }

//     setRows((prevRows) => {
//       const newRow: ScheduleRow = {
//         uiId: crypto.randomUUID(),
//         date: draft.date!,
//         startTime: draft.startTime,
//         endTime: draft.endTime,
//       };

//       return [...prevRows, newRow];
//     });

//     // ✅ 입력줄 초기화
//     setDraft(createDraft());
//   };

//   //사용자가 선택한 값을 인자로 받아서 이전 rows값들 중
//   //row.id와 사용자가 선택한 uiId가 같지 않은 것 들만 추출해서 새 배열로 만든다.
//   //즉 사용자가 선택한 아이디만 삭제
//   const removeRow = (uiId: string) => {
//     setRows((prevRows) => {
//       return prevRows.filter((row) => row.uiId !== uiId);
//     });
//   };

//   // ----------------------------
//   // (5) 렌더
//   // ----------------------------
//   return (
//     <div className='mx-auto flex w-full flex-col gap-[30px] px-[24px] md:w-[700px] md:px-[30px] lg:px-[0px]'>
//       <div className='flex flex-col gap-[24px]'>
//         <Title as='h3' className='font-xl-bold text-gray-950'>
//           내 체험등록
//         </Title>

//         {/* 제목 */}
//         <div className='flex flex-col gap-[10px]'>
//           <Label className='font-lg-bold text-gray-950'>제목</Label>
//           <BaseInput onChange={onChangeTitle} id='title' placeholder='제목을 입력해 주세요' />
//         </div>

//         {/* 카테고리 */}
//         <div className='flex flex-col gap-[10px]'>
//           <Label className='font-lg-bold text-gray-950'>카테고리</Label>

//           <Dropdown className='relative w-full'>
//             <DropdownTrigger className='flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
//               <span className={category ? 'text-gray-900' : 'text-gray-400'}>
//                 {category || '카테고리를 선택해 주세요'}
//               </span>
//               <Icons.ArrowDown />
//             </DropdownTrigger>

//             <DropdownList className='absolute top-full left-0 z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
//               {['문화·예술', '식음료', '투어', '관광', '웰빙'].map((c) => (
//                 <DropdownItem
//                   key={c}
//                   onClick={() => handleClickCategory(c)}
//                   className='rounded-lg px-3 py-2 hover:bg-gray-50'>
//                   {c}
//                 </DropdownItem>
//               ))}
//             </DropdownList>
//           </Dropdown>
//         </div>

//         {/* 설명 */}
//         <div className='flex flex-col gap-[10px]'>
//           <Label className='font-lg-bold text-gray-950'>설명</Label>
//           <TextArea
//             value={text}
//             onChange={onChangeText}
//             variant='default'
//             placeholder='설명을 입력해 주세요'
//           />
//         </div>

//         {/* 가격 */}
//         <div className='flex flex-col gap-[10px]'>
//           <Label className='font-lg-bold text-gray-950'>가격</Label>
//           <BaseInput
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             id='price'
//             placeholder='체험 금액을 입력해 주세요'
//           />
//         </div>

//         {/* 주소 */}
//         <div className='flex flex-col gap-[10px]'>
//           <Label className='font-lg-bold text-gray-950'>주소</Label>
//           <BaseInput
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             id='address'
//             placeholder='주소를 입력해 주세요'
//           />
//         </div>
//       </div>

//       {/* ----------------------------
//           ✅ 예약 가능한 시간대
//           ---------------------------- */}
//       {/* ----------------------------
//     ✅ 예약 가능한 시간대
//     ---------------------------- */}
//       <div className='w-full'>
//         <Title className='font-lg-bold mb-[18px] text-gray-950' as='h4'>
//           예약 가능한 시간대
//         </Title>

//         <div className='flex flex-col gap-[10px]'>
//           {/* ✅ 헤더: 모바일에서 숨기고(sm 이상에서만 보이기) */}
//           <div className='hidden w-full grid-cols-[1fr_160px_200px_auto] items-end gap-4 sm:grid'>
//             <Label className='font-lg-medium text-gray-950'>날짜</Label>
//             <Label className='font-lg-medium text-gray-950'>시작 시간</Label>
//             <Label className='font-lg-medium text-gray-950'>종료 시간</Label>
//             <span />
//           </div>

//           {/* ✅ 입력줄(draft)
//         - 모바일: 2줄 구조
//         - sm 이상: 기존 grid 한 줄 구조 유지
//     */}
//           <div className='flex flex-col gap-3 sm:grid sm:w-full sm:grid-cols-[1fr_160px_160px_auto] sm:items-center sm:gap-4'>
//             {/* (1) 날짜 + (+버튼) */}
//             <div className='flex items-end gap-3 sm:block'>
//               <div className='flex-1'>
//                 <Label className='font-lg-medium text-gray-950 sm:hidden'>날짜</Label>
//                 <DatePicker value={draft.date} onChange={handleDraftDate} />
//               </div>

//               {/* + 버튼: 모바일에서는 날짜 줄 옆에, sm 이상에서는 원래 자리로 */}
//             </div>

//             {/* (2) 시작/종료 (모바일에서 가로로 한 줄) */}
//             <div className='grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2 sm:contents'>
//               {/* 시작 시간 */}
//               <div className='w-full sm:w-[160px]'>
//                 <Label className='font-lg-medium text-gray-950 sm:hidden'>시작 시간</Label>
//                 <Dropdown className='relative w-full'>
//                   <DropdownTrigger className='flex h-[54px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
//                     <span>{draft.startTime}</span>
//                     <Icons.ArrowDown />
//                   </DropdownTrigger>

//                   <DropdownList className='absolute top-full left-0 z-50 mt-2 max-h-[160px] w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
//                     {TIME_OPTIONS.map((time) => (
//                       <DropdownItem
//                         key={time}
//                         onClick={() => handleDraftStartTime(time)}
//                         className='rounded-lg px-3 py-2 hover:bg-gray-50'>
//                         {time}
//                       </DropdownItem>
//                     ))}
//                   </DropdownList>
//                 </Dropdown>
//               </div>

//               {/* 가운데 ~ */}
//               <span className='mb-[16px] text-gray-400 sm:hidden'>-</span>

//               {/* 종료 시간 */}
//               <div className='w-full sm:w-[160px]'>
//                 <Label className='font-lg-medium text-gray-950 sm:hidden'>종료 시간</Label>
//                 <Dropdown className='relative w-full'>
//                   <DropdownTrigger className='flex h-[54px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
//                     <span>{draft.endTime}</span>
//                     <Icons.ArrowDown />
//                   </DropdownTrigger>

//                   <DropdownList className='absolute top-full left-0 z-50 mt-2 max-h-[160px] w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
//                     {TIME_OPTIONS.filter((t) => toHour(t) > toHour(draft.startTime)).map((time) => (
//                       <DropdownItem
//                         key={time}
//                         onClick={() => handleDraftEndTime(time)}
//                         className='rounded-lg px-3 py-2 hover:bg-gray-50'>
//                         {time}
//                       </DropdownItem>
//                     ))}
//                   </DropdownList>
//                 </Dropdown>
//               </div>
//               {/* ✅ 모바일에서 + 버튼은 시간 옆 */}
//               <div className='mb-[6px] shrink-0 sm:hidden'>
//                 <CircleButton variant='plus' onClick={addScheduleFromDraft} />
//               </div>

//               {/* ✅ sm 이상에서만 보이는 + 버튼 자리(원래대로) */}
//               <div className='hidden sm:flex sm:justify-end'>
//                 <CircleButton variant='plus' onClick={addScheduleFromDraft} />
//               </div>
//             </div>
//           </div>
//         </div>

//         <span className='border-grey-100 mt-[20px] mb-[20px] block w-full border-b' />

//         {/* ✅ 아래 목록(rows)
//       - 모바일: 2줄 구조 + (- 버튼은 날짜 줄 오른쪽)
//       - sm 이상: 기존 grid 한 줄
//   */}
//         {rows.map((row) => (
//           <div
//             key={row.uiId}
//             className='mt-5 flex flex-col gap-3 sm:grid sm:w-full sm:grid-cols-[1fr_160px_160px_auto] sm:items-center sm:gap-4'>
//             {/* 날짜 + (-버튼) */}
//             <div className='flex items-end gap-3 sm:block'>
//               <div className='flex-1'>
//                 <Label className='font-lg-medium text-gray-950 sm:hidden'>날짜</Label>
//                 <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-700'>
//                   {row.date.toLocaleDateString('ko-KR')}
//                 </div>
//               </div>
//             </div>

//             {/* 시작/종료 */}
//             <div className='grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2 sm:contents'>
//               <div className='w-full sm:w-[160px]'>
//                 <Label className='font-lg-medium text-gray-950 sm:hidden'>시작 시간</Label>
//                 <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900'>
//                   {row.startTime}
//                 </div>
//               </div>

//               <span className='mb-[16px] text-gray-400 sm:hidden'>-</span>

//               <div className='w-full sm:w-[160px]'>
//                 <Label className='font-lg-medium text-gray-950 sm:hidden'>종료 시간</Label>
//                 <div className='flex h-13.5 items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900'>
//                   {row.endTime}
//                 </div>
//               </div>

//               {/* ✅ sm 이상에서는 원래 자리의 - 버튼 */}
//               <div className='hidden sm:flex sm:justify-end'>
//                 <CircleButton variant='minus' onClick={() => removeRow(row.uiId)} />
//               </div>

//               {/* - 버튼: 모바일에서는 날짜 옆 */}
//               <div className='mb-[6px] shrink-0 sm:hidden'>
//                 <CircleButton variant='minus' onClick={() => removeRow(row.uiId)} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className='flex flex-col gap-[10px]'>
//         <Label>
//           <span className='font-lg-bold text-gray-950'>배너 이미지 등록</span>
//         </Label>
//         <BannerImageSection />
//       </div>
//       <div className='flex flex-col gap-[10px]'>
//         <Label>
//           <span className='font-lg-bold text-gray-950'>소개 이미지 등록</span>
//         </Label>
//         <IntroImageSection />
//       </div>
//       <div className='mb-[30px] flex justify-center md:mb-[53px] lg:mb-[106px]'>
//         <PrimaryButton onClick={handleSubmit} className='font-md-bold h-[41px] w-[120px]'>
//           {isPending ? '등록 중...' : '등록하기'}
//         </PrimaryButton>
//       </div>
//     </div>
//   );
// }
