import { AxiosResponse } from 'axios';

import API from "./axios";
import { API_URL } from "./url";

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
    };
}

export const loginApi = (payload: LoginPayload): Promise<AxiosResponse<LoginResponse> | null> => {
    return API.post<LoginResponse>(API_URL.LOGIN_API, payload)
        .then((res) => {
            if (res.data) {
                return res;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error in loginApi:", error);
            return null;
        });
};