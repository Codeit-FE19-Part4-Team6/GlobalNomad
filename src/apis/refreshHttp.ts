import axios from 'axios';
import { API_BASE_URL } from '../libs/config';

export const refreshHttp = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
