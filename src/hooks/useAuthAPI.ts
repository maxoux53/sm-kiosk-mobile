import { useState } from "react";
import * as authApi from "../api/endpoints/auth.api";
import { token } from "../api/secureStore";
import { LoginResponse, SignUpRequest, SignUpResponse } from "../types/api";

export default function useAuthAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * @throws {Error} Si la connexion échoue.
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
     * @throws {Error} Si l'inscription échoue.
     */
    const signup = async (user: SignUpRequest): Promise<SignUpResponse> => {
        setIsLoading(true);

        try {
            // `POST /signup` ne renvoie que l'id : on enchaîne un login
            // pour récupérer le JWT et ouvrir la session.
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
