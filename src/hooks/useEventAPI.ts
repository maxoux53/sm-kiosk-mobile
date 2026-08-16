import { useState } from "react";
import * as eventApi from "../api/endpoints/event.api";
import { Event } from "../types/api";

export default function useEventAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getEvent = async (id: number): Promise<Event> => {
        setIsLoading(true);

        try {
            return await eventApi.getEvent(id);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        getEvent
    };
}
