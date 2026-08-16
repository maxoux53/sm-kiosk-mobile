import { useState } from "react";
import * as authApi from "../api/endpoints/auth.api";
import { token } from "../api/secureStore";
import { LoginResponse, SignUpRequest, SignUpResponse } from "../types/api";

export default function useAuthAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * @throws {Error}
     */
    const login = async (email: string, password: string): Promise<LoginResponse> => {
        setIsLoading(true);

        try {
            const response = await authApi.login(email, password);
            await token.write(response.token);

            return response;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error}
     */
    const signup = async (user: SignUpRequest): Promise<SignUpResponse> => {
        setIsLoading(true);

        try {
            await authApi.signup(user);
            const response = await authApi.login(user.email.trim().toLowerCase(), user.password);
            await token.write(response.token);

            return response;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        login,
        signup
    };
}
