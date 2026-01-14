import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 640) {
  const getIsMobile = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth <= breakpoint;
  };

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    // ✅ 마운트 시 한 번 동기화
    onResize();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}
