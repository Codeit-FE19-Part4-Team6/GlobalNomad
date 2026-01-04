import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getMyInfo } from '@/apis/user';
import type { User } from '@/apis/type';
/**
 * 내 정보 조회 훅
 * - React Query를 사용하여 서버에서 현재 로그인한 사용자의 정보를 가져오는 훅
 * - 옵션을 전달하면 React Query의 useQuery 옵션을 일부 커스터마이징할 수 있음
 */
export const useMyInfo = (
  // useQuery에 전달할 수 있는 옵션 타입을 제한
  // queryKey와 queryFn은 내부에서 이미 정의했으므로 제외(Omit)
  options?: Omit<UseQueryOptions<User, Error, User, ['myInfo']>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<User, Error, User, ['myInfo']>({
    queryKey: ['myInfo'],
    queryFn: getMyInfo, // 서버에서 내 정보를 가져오는 함수
    staleTime: 1000 * 60,
    ...options,
  });
};
