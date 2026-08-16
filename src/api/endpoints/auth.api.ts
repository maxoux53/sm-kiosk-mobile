import { apiClient } from "../client";
import { LoginResponse, CreatedUserResponse, SignUpRequest } from "../../types/api";
import { AxiosError } from "axios";

/**
 * @throws {AxiosError} Si la requête échoue.
 */
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

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const signup = async (user: SignUpRequest): Promise<CreatedUserResponse> => {
    const response = await apiClient.post<CreatedUserResponse>(
        "signup",
        {
            first_name: user.first_name.trim(),
            last_name: user.last_name.trim(),
            email: user.email.trim().toLowerCase(),
            password: user.password,
            ...(user.avatar ? { avatar: user.avatar } : {})
        }
    );

    return response.data;
};
