import { apiClient, API_INTERACT_ROUTE } from "../client";
import { Category } from "../../types/api";
import { AxiosError } from "axios";

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const getCategoriesByEvent = async (eventId: number): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>(
        `${API_INTERACT_ROUTE}event/${eventId}/categories`
    );

    return response.data;
};
