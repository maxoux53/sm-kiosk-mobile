import { apiClient, API_INTERACT_ROUTE } from "../client";
import { Vat } from "../../types/api";

export const getVat = async (type: string): Promise<Vat> => {
    const response = await apiClient.get<Vat>(
        `${API_INTERACT_ROUTE}vat/${type}`
    );

    return response.data;
};

export const getAllVat = async (): Promise<Vat[]> => {
    const response = await apiClient.get<Vat[]>(
        `${API_INTERACT_ROUTE}vat`
    );

    return response.data;
};
