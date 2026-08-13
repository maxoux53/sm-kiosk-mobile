import { apiClient, API_INTERACT_ROUTE } from "../client";
import { Event } from "../../types/api";

export const getEvent = async (id: number): Promise<Event> => {
    const response = await apiClient.get<Event>(
        `${API_INTERACT_ROUTE}event/${id}`
    );

    return response.data;
};
