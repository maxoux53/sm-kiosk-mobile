import { useState } from "react";
import * as categoryApi from "../api/endpoints/category.api";
import { Category } from "../types/api";

export default function useCategoryAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getCategoriesByEvent = async (eventId: number): Promise<Category[]> => {
        setIsLoading(true);

        try {
            return await categoryApi.getCategoriesByEvent(eventId);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        getCategoriesByEvent
    };
}
