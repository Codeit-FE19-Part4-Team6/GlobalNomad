import { createRoot } from 'react-dom/client';
import './index.css';
import { Navigate } from 'react-router-dom';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/common/Layout.tsx';
import MainPage from './pages/MainPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import MyPageLayout from '@/pages/MyPageLayout';
import MyProfilePage from '@/pages/MyProfilePage';
import ReservationPage from '@/pages/ReservationPage';
import MyExperiencesPage from '@/pages/MyExperiencesPage';
import BookingStatusPage from '@/pages/BookingStatusPage';
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
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <MainPage /> },
          {
            path: 'mypage',
            element: <MyPageLayout />,
            children: [
              {
                index: true,
                element: <Navigate to='reservation' replace />,
              },
              { path: 'profile', element: <MyProfilePage /> },
              { path: 'reservation', element: <ReservationPage /> },
              { path: 'experiences', element: <MyExperiencesPage /> },
              { path: 'status', element: <BookingStatusPage /> },
            ],
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
