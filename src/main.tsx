import { createRoot } from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/common/Layout.tsx';
import MainPage from './pages/MainPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';

// QueryClient를 컴포넌트 밖에서 한 번만 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 - 이 시간 동안은 fresh 상태 유지
      gcTime: 1000 * 60 * 10, // 10분 - 캐시 메모리 유지 시간
      refetchOnWindowFocus: false, // 탭 전환 시 자동 리페칭 끄기
      retry: 1, // API 실패 시 1번만 재시도
    },
  },
});

const router = createBrowserRouter([
  {
    // 헤더와 푸터가 있는 레이아웃이 필요한 페이지들
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [{ path: '/', element: <MainPage /> }],
    // 헤더/푸터가 필요한 다른 페이지는 여기에 추가
    // 예: { path: '/about', element: <AboutPage /> },
  },
  {
    // 헤더와 푸터 없이 독립적인 레이아웃이 필요한 페이지들
    path: '/login',
    element: <LoginPage />,
    // 회원가입 및 다른 페이지 추가 시 여기에 작성
    // 예: { path: '/signup', element: <SignupPage /> },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
