import { useState } from "react";
import { checkError } from "../utils/checkError";
import * as vatApi from "../api/endpoints/vat.api";
import { Vat } from "../types/api";

export default function useVatAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getVat = async (type: string): Promise<Vat> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await vatApi.getVat(type);
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getAllVats = async (): Promise<Vat[]> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await vatApi.getAllVats();
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
        getVat,
        getAllVats
    };
}
