// import './App.css';

// function App() {
//   return <></>;
// }

// export default App;

import { useState } from 'react';
import TextArea from '@/components/common/Textarea';

export default function App() {
  const [text, setText] = useState('');

  return (
    <div className='p-10'>
      <h1 className='mb-4 text-xl font-bold'>TextArea 테스트</h1>

      {/* 기본(default) variant */}
      <TextArea
        value={text}
        onChange={setText}
        placeholder='기본 TextArea 입력...'
        className='mb-6'
      />

      {/* modal variant */}
      <TextArea
        value={text}
        onChange={setText}
        variant='modal'
        placeholder='Modal 스타일 TextArea 입력...'
      />
    </div>
  );
}
