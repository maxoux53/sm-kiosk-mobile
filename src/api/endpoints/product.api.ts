import { apiClient, API_INTERACT_ROUTE } from "../client";
import { Product } from "../../types/api";
import { AxiosError } from "axios";

/**
 * @throws {AxiosError}
 */
export const getProduct = async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(
        `${API_INTERACT_ROUTE}product/${id}`
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const getAllProductsByEvent = async (eventId: number): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(
        `${API_INTERACT_ROUTE}event/${eventId}/products`
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const createProduct = async (product: Product): Promise<Product> => {
    const response = await apiClient.post<Product>(
        `${API_INTERACT_ROUTE}product`,
        product
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const updateProduct = async (product: Product): Promise<Product> => {
    const response = await apiClient.patch<Product>(
        `${API_INTERACT_ROUTE}product/${product.id}`,
        product
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const deleteProduct = async (id: number): Promise<void> => {
    await apiClient.delete<void>(
        `${API_INTERACT_ROUTE}product/${id}`
    );

    return;
};
