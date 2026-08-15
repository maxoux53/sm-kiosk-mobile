import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, OrderLine } from "../types/api";
import { checkError } from "../utils/checkError";
import useProductAPI from "./useProductAPI";
import useVatAPI from "./useVatAPI";

export default function useCart() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const { getProduct } = useProductAPI();
    const { getVat } = useVatAPI();

    const SM_ASTORAGE_CART_KEY = "@cart";

    /**
     * @throws {Error} Si la récupération du taux de TVA échoue.
     */
    const getPriceInclVat = async (product: Product): Promise<number> => {
        const vat = await getVat(product.category?.vat_type!);
        return product.excl_vat_price * (1 + vat.rate / 100);
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getCart = async (): Promise<OrderLine[]> => {
        setIsLoading(true);
        
        try {
            const cart = await AsyncStorage.getItem(SM_ASTORAGE_CART_KEY);

            if (!cart) {
                return new Array<OrderLine>();
            }

            return JSON.parse(cart) as OrderLine[];
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const setCart = async (cart: OrderLine[]): Promise<void> => {
        setIsLoading(true);
        
        try {
            await AsyncStorage.setItem(SM_ASTORAGE_CART_KEY, JSON.stringify(cart));
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = async (): Promise<void> => {
        return setCart(new Array<OrderLine>());
    }

    const addToCart = async (product_id: number, quantity: number): Promise<void> => {
        setIsLoading(true);
        
        try {
            const product = await getProduct(product_id);
            const cart = await getCart();

            const existingOrderLineIndex = cart.findIndex((orderLine) => orderLine.product_id === product_id);

            if (existingOrderLineIndex !== -1) {
                cart[existingOrderLineIndex].quantity += quantity;
                cart[existingOrderLineIndex].price = (await getPriceInclVat(product)) * cart[existingOrderLineIndex].quantity;
            } else {
                cart.push({
                    product_id,
                    quantity: quantity,
                    price: (await getPriceInclVat(product)) * quantity,
                    product: product
                });
            }
            await setCart(cart);
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (product_id: number): Promise<void> => {
        setIsLoading(true);
        
        try {
            const cart = await getCart();
            const updatedCart = cart.filter((orderLine) => orderLine.product_id !== product_id);
            await setCart(updatedCart);
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (product_id: number, quantity: number): Promise<void> => {
        if (quantity < 0) {
            throw new Error("Quantity cannot be negative");
        }

        if (quantity === 0) {
            await removeFromCart(product_id);
            return;
        }

        setIsLoading(true);

        try {
            const cart = await getCart();
            const existingOrderLineIndex = cart.findIndex((orderLine) => orderLine.product_id === product_id);

            if (existingOrderLineIndex !== -1) {
                cart[existingOrderLineIndex].quantity = quantity;
                await setCart(cart);
            } else {
                throw new Error("Product not found in cart");
            }
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const totalPrice = async (): Promise<number> => {
        setIsLoading(true);

        try {
            const cart = await getCart();
            let total = 0;

            for (const orderLine of cart) {
                if (!orderLine.product) {
                    const product = await getProduct(orderLine.product_id);
                    orderLine.product = product;
                }
                total += (await getPriceInclVat(orderLine.product!)) * orderLine.quantity;
            }

            return total;
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const invalidateAndRefreshCartPrices = async (): Promise<number> => {
        setIsLoading(true);

        try {
            const cart = await getCart();
            let total = 0;

            for (const orderLine of cart) {
                orderLine.price = (await getPriceInclVat(await getProduct(orderLine.product_id))) * orderLine.quantity;
                total += orderLine.price;
            }

            return total;
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
        getCart,
        setCart,
        clearCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        invalidateAndRefreshCartPrices
    };
}
