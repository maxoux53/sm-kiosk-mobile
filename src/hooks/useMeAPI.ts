import { useState } from "react";
import * as meApi from "../api/endpoints/me.api";
import { User, Event, Purchase, OrderLine } from "../types/api";

export default function useMeAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getMyInfo = async (): Promise<User> => {
        setIsLoading(true);

        try {
            return await meApi.getMyInfo();
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la mise à jour échoue.
     */
    const updateMyInfo = async (user: User): Promise<User> => {
        setIsLoading(true);

        try {
            return await meApi.updateMyInfo(user);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la suppression échoue.
     */
    const deleteMyAccount = async (): Promise<void> => {
        setIsLoading(true);

        try {
            return await meApi.deleteMyAccount();
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getMyEvent = async (): Promise<Event> => {
        setIsLoading(true);

        try {
            return await meApi.getMyEvent();
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la requête échoue.
     */
    const joinEvent = async (eventId: number): Promise<{id: number}> => {
        setIsLoading(true);

        try {
            return await meApi.joinEvent(eventId);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la requête échoue.
     */
    const leaveEvent = async (eventId: number): Promise<void> => {
        setIsLoading(true);

        try {
            return await meApi.leaveEvent(eventId);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getMyPurchases = async (): Promise<Purchase[]> => {
        setIsLoading(true);

        try {
            return await meApi.getMyPurchases();
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const createOrder = async (order: OrderLine[]): Promise<void> => {
        setIsLoading(true);

        try {
            return await meApi.createOrder(order);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        getMyInfo,
        updateMyInfo,
        deleteMyAccount,
        getMyEvent,
        joinEvent,
        leaveEvent,
        getMyPurchases,
        createOrder
    };
}
