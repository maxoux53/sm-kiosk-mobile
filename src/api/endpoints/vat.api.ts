import { apiClient, API_INTERACT_ROUTE } from "../client";
import { Vat } from "../../types/api";
import { AxiosError } from "axios";

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const getVat = async (type: string): Promise<Vat> => {
    const response = await apiClient.get<Vat>(
        `${API_INTERACT_ROUTE}vat/${type}`
    );

    return response.data;
};

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const getAllVats = async (): Promise<Vat[]> => {
    const response = await apiClient.get<Vat[]>(
        `${API_INTERACT_ROUTE}vat`
    );

    return response.data;
};
