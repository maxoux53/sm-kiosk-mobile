import { apiClient, API_INTERACT_ROUTE } from "../client";
import { User, Event, Purchase, OrderLine } from "../../types/api";
import { AxiosError } from "axios";

/**
 * @throws {AxiosError}
 */
export const getMyInfo = async (): Promise<User> => {
    const response = await apiClient.get<User>(
        `${API_INTERACT_ROUTE}me`
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const updateMyInfo = async (user: User): Promise<User> => {
    const response = await apiClient.patch<User>(
        `${API_INTERACT_ROUTE}me`,
        user
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const deleteMyAccount = async (): Promise<void> => {
    await apiClient.delete<void>(
        `${API_INTERACT_ROUTE}me`
    );

    return;
};

/**
 * @throws {AxiosError}
 */
export const getMyEvent = async (): Promise<Event> => {
    const response = await apiClient.get<Event>(
        `${API_INTERACT_ROUTE}me/event`
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const joinEvent = async (eventId: number): Promise<{id: number}> => {
    const response = await apiClient.post<{id: number}>(
        `${API_INTERACT_ROUTE}me/event/${eventId}`
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const leaveEvent = async (eventId: number): Promise<void> => {
    await apiClient.delete<void>(
        `${API_INTERACT_ROUTE}me/event/${eventId}`
    );

    return;
};

/**
 * @throws {AxiosError}
 */
export const getMyPurchases = async (): Promise<Purchase[]> => {
    const response = await apiClient.get(
        `${API_INTERACT_ROUTE}me/purchases`
    );

    return response.data;
};

/**
 * @throws {AxiosError}
 */
export const createOrder = async (order: OrderLine[]): Promise<void> => {
    const response = await apiClient.post<void>(
        `${API_INTERACT_ROUTE}me/purchase`,
        {
            order_lines: order.map(({ product_id, quantity }) => ({
                product_id,
                quantity
            }))
        }
    );

    return;
};
