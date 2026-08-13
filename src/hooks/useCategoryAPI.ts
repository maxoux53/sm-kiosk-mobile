import { useState } from "react";
import { checkError } from "../utils/checkError";
import * as categoryApi from "../api/endpoints/category.api";
import { Category } from "../types/api";

export default function useCategoryAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getCategoriesByEvent = async (eventId: number): Promise<Category[]> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await categoryApi.getCategoriesByEvent(eventId);
        } catch (e) {
            setErrorMessage(checkError(e as Error));
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        errorMessage,
        getCategoriesByEvent
    };
}
