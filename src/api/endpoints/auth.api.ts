import { apiClient } from "../client";
import { LoginResponse, SignUpResponse, SignUpRequest } from "../../types/api";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
        "login",
        {
            email,
            password
        }
    );

    return response.data;
};

export const signup = async (user: SignUpRequest): Promise<SignUpResponse> => {
    const response = await apiClient.post<SignUpResponse>(
        "signup",
        {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            avatar: user.avatar
        }
    );

    return response.data;
};
