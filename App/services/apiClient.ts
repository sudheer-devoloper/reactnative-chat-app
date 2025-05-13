import axios from 'axios';
import { getItem, removeItem } from '../src/helpers/storage';
import { replace } from '../src/helpers/NavigationService';
import { API_URL } from './url';

const API = axios.create({
    baseURL: API_URL.BASE_URL,
    withCredentials: true,
});

API.interceptors.request.use((config: any) => {
    const token = getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            removeItem('accessToken');
            replace('Login');
        }
        return Promise.reject(error);
    }
);

export default API;
