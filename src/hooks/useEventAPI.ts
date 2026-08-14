import { useState } from "react";
import { checkError } from "../utils/checkError";
import * as eventApi from "../api/endpoints/event.api";
import { Event } from "../types/api";

export default function useEventAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getEvent = async (id: number): Promise<Event> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await eventApi.getEvent(id);
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        errorMessage,
        getEvent
    };
}
