// import { createRoot } from 'react-dom/client';
// import './index.css';
// import { StrictMode } from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Layout from './components/common/Layout.tsx';
// import MainPage from './pages/MainPage.tsx';
// import LoginPage from '@/pages/LoginPage.tsx';
// import NotFoundPage from '@/pages/NotFoundPage.tsx';
// import MyPageLayout from '@/pages/MyPageLayout.tsx';

// // QueryClient 생성
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5,
//       gcTime: 1000 * 60 * 10,
//       refetchOnWindowFocus: false,
//       retry: 1,
//     },
//   },
// });

// const router = createBrowserRouter([
//   {
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         path: '/',
//         element: <Layout />,
//         children: [
//           { path: '/', element: <MainPage /> },
//           {
//             path: 'mypage',
//             element: <MyPageLayout />,
//           },
//         ],
//       },
//       { path: '/login', element: <LoginPage /> },
//     ],
//   },
// ]);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   </StrictMode>
// );

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
import CreateActivityPage from '@/pages/CreateActivityPage.tsx';
import EditActivityPage from '@/pages/EditActivityPage.tsx';

// QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 1,
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
          { path: '/', element: <MainPage /> },
          { path: 'mypage', element: <MyPageLayout /> },
          { path: 'activities/create', element: <CreateActivityPage /> },
          { path: 'activities/edit/:activityId', element: <EditActivityPage /> },
        ],
      },
      { path: '/login', element: <LoginPage /> },
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
