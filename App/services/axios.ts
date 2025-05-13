import axios from 'axios';
import { getItem, removeItem, setItem } from '../src/helpers/storage';
import { replace } from '../src/helpers/NavigationService';
import { API_URL } from './url';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const API = axios.create({
    baseURL: API_URL.BASE_URL,
    withCredentials: true,
});

API.interceptors.request.use((config: any) => {
    const token = getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

API.interceptors.response.use(
    (res) => res,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const res = await axios.get(API_URL.BASE_URL + API_URL.REFRESH_TOKEN, { withCredentials: true });
                    const newToken = res.data.accessToken;
                    setItem('accessToken', newToken);
                    refreshSubscribers.forEach((cb) => cb(newToken));
                    refreshSubscribers = [];
                } catch (err) {
                    removeItem('accessToken');
                    replace('Login');
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve) => {
                refreshSubscribers.push((token: string) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(API(originalRequest));
                });
            });
        }
        return Promise.reject(error);
    }
);

export default API;
