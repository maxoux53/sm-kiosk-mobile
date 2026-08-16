import { useState } from "react";
import * as vatApi from "../api/endpoints/vat.api";
import { Vat } from "../types/api";

export default function useVatAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * @throws {Error}
     */
    const getVat = async (type: string): Promise<Vat> => {
        setIsLoading(true);

        try {
            return await vatApi.getVat(type);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error}
     */
    const getAllVats = async (): Promise<Vat[]> => {
        setIsLoading(true);

        try {
            return await vatApi.getAllVats();
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        getVat,
        getAllVats
    };
}
