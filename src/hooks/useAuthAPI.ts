import { useState } from "react";
import { checkError } from "../utils/checkError";
import * as authApi from "../api/endpoints/auth.api";
import { token } from "../api/secureStore";
import { LoginResponse } from "../types/api";

export default function useAuthAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    /**
     * @throws {Error} Si la connexion échoue.
     */
    const login = async (email: string, password: string): Promise<LoginResponse> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            const response = await authApi.login(email, password);
            await token.write(response.token);

            return response;
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        errorMessage,
        login
    };
}
