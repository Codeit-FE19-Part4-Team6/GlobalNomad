import { http } from '@/apis/http';
import type { LoginRequest, LoginResponse, User, UserSignupRequest } from '@/apis/type';

const usersApi = {
  signup: async (data: UserSignupRequest) => {
    const response = await http.post<User>('/users', data);
    return response.data;
  },
  login: async (data: LoginRequest) => {
    const response = await http.post<LoginResponse>('/auth/login', data);
    return response.data;
  },
};

export default usersApi;
