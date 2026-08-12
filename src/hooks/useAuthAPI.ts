import { useState } from "react";
import { checkError } from "../utils/checkError";
import { login as loginAPI } from "../api/endpoints/auth.api";

export default function useAuthAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();


  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setErrorMessage(undefined);
      const response = await loginAPI(email, password);
      return response; // Return ce qu'il faut
    } catch (error) {
      checkError(error, setErrorMessage)
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    login,
  };
}
