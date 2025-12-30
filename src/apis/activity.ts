import { http } from '@/apis/http';
import type {
  ActivityDetailResponse,
  ActivityRequest,
  ActivityResponse,
  CreateActivityRequest,
  CreateActivityResponse,
} from '@/apis/type';

const activityApi = {
  // 체험 리스트 조회
  getActivities: async (params: ActivityRequest) => {
    return http.get<ActivityResponse>('/activities', {
      params,
    });
  },
  // 체험 등록
  createActivity: async (data: CreateActivityRequest) => {
    return http.post<CreateActivityResponse>('/activities', data);
  },
  // 체험 상세 조회
  getActivityDetail: async (activityId: number) => {
    return http.get<ActivityDetailResponse>(`/activities/${activityId}`);
  },
  // 체험 예약 가능일 조회
  // 체험 리뷰 조회
  //체험 예약 신청
  // 체험 이미지 url 생성
};

export default activityApi;
