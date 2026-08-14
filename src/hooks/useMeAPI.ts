import { useState } from "react";
import { checkError } from "../utils/checkError";
import * as meApi from "../api/endpoints/me.api";
import { User, Event, Purchase } from "../types/api";

export default function useMeAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getMyInfo = async (): Promise<User> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await meApi.getMyInfo();
        } catch (e) {
            const msg = checkError(e as Error);
            setErrorMessage(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la mise à jour échoue.
     */
    const updateMyInfo = async (user: User): Promise<User> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await meApi.updateMyInfo(user);
        } catch (e) {
            const msg = checkError(e as Error);
            setErrorMessage(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la suppression échoue.
     */
    const deleteMyAccount = async (): Promise<void> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await meApi.deleteMyAccount();
        } catch (e) {
            const msg = checkError(e as Error);
            setErrorMessage(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getMyEvent = async (): Promise<Event> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await meApi.getMyEvent();
        } catch (e) {
            const msg = checkError(e as Error);
            setErrorMessage(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la requête échoue.
     */
    const joinEvent = async (eventId: number): Promise<{id: number}> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await meApi.joinEvent(eventId);
        } catch (e) {
            const msg = checkError(e as Error);
            setErrorMessage(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la requête échoue.
     */
    const leaveEvent = async (eventId: number): Promise<void> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await meApi.leaveEvent(eventId);
        } catch (e) {
            const msg = checkError(e as Error);
            setErrorMessage(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getMyPurchases = async (): Promise<Purchase[]> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await meApi.getMyPurchases();
        } catch (e) {
            const msg = checkError(e as Error);
            setErrorMessage(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        errorMessage,
        getMyInfo,
        updateMyInfo,
        deleteMyAccount,
        getMyEvent,
        joinEvent,
        leaveEvent,
        getMyPurchases
    };
}
