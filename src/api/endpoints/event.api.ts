import { apiClient, API_INTERACT_ROUTE } from "../client";
import { Event } from "../../types/api";
import { AxiosError } from "axios";

/**
 * @throws {AxiosError}
 */
export const getEvent = async (id: number): Promise<Event> => {
    const response = await apiClient.get<Event>(
        `${API_INTERACT_ROUTE}event/${id}`
    );

    return response.data;
};
