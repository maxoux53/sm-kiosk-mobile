import { useState } from "react";
import { checkError } from "../utils/checkError";
import * as productApi from "../api/endpoints/product.api";
import { Product } from "../types/api";

export default function useProductAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getProduct = async (id: number): Promise<Product> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await productApi.getProduct(id);
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
    const getAllProductsByEvent = async (eventId: number): Promise<Product[]> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await productApi.getAllProductsByEvent(eventId);
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la création échoue.
     */
    const createProduct = async (product: Product): Promise<Product> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await productApi.createProduct(product);
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la mise à jour échoue.
     */
    const updateProduct = async (product: Product): Promise<Product> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await productApi.updateProduct(product);
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la suppression échoue.
     */
    const deleteProduct = async (id: number): Promise<void> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await productApi.deleteProduct(id);
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
        getProduct,
        getAllProductsByEvent,
        createProduct,
        updateProduct,
        deleteProduct
    };
}
