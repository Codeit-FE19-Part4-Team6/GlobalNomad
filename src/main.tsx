import { createRoot } from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/common/Layout.tsx';
import MainPage from './pages/MainPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import MyPageLayout from '@/pages/MyPageLayout.tsx';
import SignupPage from '@/pages/SignupPage.tsx';
import { SnackBarProvider } from '@/providers/SnackBarProvider.tsx';

// QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0, // Mutation은 재시도 X
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      {
        // Layout을 사용하는 보호된 라우트
        element: <Layout />,
        children: [
          { index: true, element: <MainPage /> },
          { path: 'mypage', element: <MyPageLayout /> },
        ],
      },
      // Layout 없는 인증 페이지들
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackBarProvider>
        <RouterProvider router={router} />
      </SnackBarProvider>
    </QueryClientProvider>
  </StrictMode>
);
