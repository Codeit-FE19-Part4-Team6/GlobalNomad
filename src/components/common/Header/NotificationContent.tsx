// 알림 콘텐츠 파싱 결과 타입
interface ParsedNotification {
  type: 'parsed' | 'raw';
  status?: '예약 승인' | '예약 거절';
  title?: string;
  time?: string;
  statusLine?: string;
  rawContent?: string;
}

// 알림 콘텐츠 파싱 함수 (상태 판단 로직 1곳)
const parseNotificationContent = (content: string): ParsedNotification => {
  const pattern = /^(.+?)\((\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}~\d{2}:\d{2})\)\s*(.+)$/;
  const match = content.match(pattern);

  if (!match) {
    return { type: 'raw', rawContent: content };
  }

  const title = match[1].trim();
  const time = match[2].trim();
  const statusLine = match[3].trim();

  let status: '예약 승인' | '예약 거절' | undefined;
  if (statusLine.includes('승인')) {
    status = '예약 승인';
  } else if (statusLine.includes('거절')) {
    status = '예약 거절';
  }

  return { type: 'parsed', status, title, time, statusLine };
};

// 상태 텍스트 하이라이팅 컴포넌트 (파싱 역할 분리)
const HighlightedStatusText = ({ text }: { text: string }) => {
  if (text.includes('승인')) {
    const parts = text.split('승인');
    return (
      <>
        {parts[0]}
        <span className='text-primary-500'>승인</span>
        {parts[1]}
      </>
    );
  }

  if (text.includes('거절')) {
    const parts = text.split('거절');
    return (
      <>
        {parts[0]}
        <span className='text-red-500'>거절</span>
        {parts[1]}
      </>
    );
  }

  return <>{text}</>;
};
// 알림 콘텐츠 표시 컴포넌트 (JSX 안에서 함수 실행 없음)
const NotificationContent = ({ content }: { content: string }) => {
  const parsed = parseNotificationContent(content);

  if (parsed.type === 'raw') {
    return <p className='font-md-medium leading-[1.2] text-gray-800'>{parsed.rawContent}</p>;
  }

  return (
    <div className='flex flex-col gap-1'>
      <p className='font-md-semibold mb-2 leading-[1.3] text-gray-900'>{parsed.status}</p>
      <p className='font-md-medium whitespace-nowrap text-gray-800'>{parsed.title}</p>
      <p className='font-md-medium whitespace-nowrap text-gray-800'>({parsed.time})</p>
      <p className='font-md-medium text-gray-800'>
        <HighlightedStatusText text={parsed.statusLine!} />
      </p>
    </div>
  );
};

export default NotificationContent;
