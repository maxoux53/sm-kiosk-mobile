import { useState } from "react";
import * as productApi from "../api/endpoints/product.api";
import { Product } from "../types/api";

export default function useProductAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getProduct = async (id: number): Promise<Product> => {
        setIsLoading(true);

        try {
            return await productApi.getProduct(id);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getAllProductsByEvent = async (eventId: number): Promise<Product[]> => {
        setIsLoading(true);

        try {
            return await productApi.getAllProductsByEvent(eventId);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la création échoue.
     */
    const createProduct = async (product: Product): Promise<Product> => {
        setIsLoading(true);

        try {
            return await productApi.createProduct(product);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la mise à jour échoue.
     */
    const updateProduct = async (product: Product): Promise<Product> => {
        setIsLoading(true);

        try {
            return await productApi.updateProduct(product);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la suppression échoue.
     */
    const deleteProduct = async (id: number): Promise<void> => {
        setIsLoading(true);

        try {
            return await productApi.deleteProduct(id);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        getProduct,
        getAllProductsByEvent,
        createProduct,
        updateProduct,
        deleteProduct
    };
}
