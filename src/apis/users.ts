import { http } from '@/apis/http';
import type { User, UserSignupRequest } from '@/apis/type';

const usersApi = {
  signup: async (data: UserSignupRequest) => {
    const response = await http.post<User>('/users', data);
    return response.data;
  },
};

export default usersApi;
