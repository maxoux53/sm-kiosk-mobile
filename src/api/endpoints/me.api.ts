import { apiClient, API_INTERACT_ROUTE } from "../client";
import { User, Event, Purchase, OrderLine } from "../../types/api";
import { AxiosError } from "axios";

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const getMyInfo = async (): Promise<User> => {
    const response = await apiClient.get<User>(
        `${API_INTERACT_ROUTE}me`
    );

    return response.data;
};

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const updateMyInfo = async (user: User): Promise<User> => {
    const response = await apiClient.patch<User>(
        `${API_INTERACT_ROUTE}me`,
        user
    );

    return response.data;
};

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const deleteMyAccount = async (): Promise<void> => {
    await apiClient.delete<void>(
        `${API_INTERACT_ROUTE}me`
    );

    return;
};

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const getMyEvent = async (): Promise<Event> => {
    const response = await apiClient.get<Event>(
        `${API_INTERACT_ROUTE}me/event`
    );

    return response.data;
};

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const joinEvent = async (eventId: number): Promise<{id: number}> => {
    const response = await apiClient.post<{id: number}>(
        `${API_INTERACT_ROUTE}me/event/${eventId}`
    );

    return response.data;
};

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const leaveEvent = async (eventId: number): Promise<void> => {
    await apiClient.delete<void>(
        `${API_INTERACT_ROUTE}me/event/${eventId}`
    );

    return;
};

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const getMyPurchases = async (): Promise<Purchase[]> => {
    const response = await apiClient.get(
        `${API_INTERACT_ROUTE}me/purchases`
    );

    return response.data;
};

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const createOrder = async (order: OrderLine[]): Promise<Purchase> => {
    const response = await apiClient.post<Purchase>(
        `${API_INTERACT_ROUTE}me/purchase`,
        {
            order_lines: order.map(({ product_id, quantity }) => ({
                product_id,
                quantity
            }))
        }
    );

    return response.data;
};
