import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, OrderLine } from "../types/api";
import useProductAPI from "./useProductAPI";
import useVatAPI from "./useVatAPI";
import useMeAPI from "./useMeAPI";

export default function useCart() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { getProduct } = useProductAPI();
    const { getVat } = useVatAPI();
    const { createOrder } = useMeAPI();

    const SM_ASTORAGE_CART_KEY = "@cart";

    const readCart = async (): Promise<OrderLine[]> => {
        const cart = await AsyncStorage.getItem(SM_ASTORAGE_CART_KEY);

        if (!cart) {
            return new Array<OrderLine>();
        }

        return JSON.parse(cart) as OrderLine[];
    };

    const writeCart = async (cart: OrderLine[]): Promise<void> => {
        await AsyncStorage.setItem(SM_ASTORAGE_CART_KEY, JSON.stringify(cart));
    };

    /**
     * @throws {Error} Si la récupération du taux de TVA échoue.
     */
    const getPriceInclVat = async (product: Product): Promise<number> => {
        const exclVatPrice = Number(product.excl_vat_price);

        const vatRate = product.category?.vat?.rate;
        if (vatRate !== undefined && vatRate !== null) {
            return exclVatPrice * (1 + Number(vatRate) / 100);
        }

        const vatType = product.category?.vat_type;

        if (!vatType) {
            return exclVatPrice;
        }

        const vat = await getVat(vatType);
        return exclVatPrice * (1 + Number(vat.rate) / 100);
    };

    /**
     * @throws {Error} Si la récupération échoue.
     */
    const getCart = async (): Promise<OrderLine[]> => {
        setIsLoading(true);

        try {
            return await readCart();
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la sauvegarde échoue.
     */
    const setCart = async (cart: OrderLine[]): Promise<void> => {
        setIsLoading(true);

        try {
            await writeCart(cart);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la suppression échoue.
     */
    const clearCart = async (): Promise<void> => {
        return setCart(new Array<OrderLine>());
    }

    /**
     * @throws {Error} Si l'ajout au panier échoue.
     */
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
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la suppression échoue.
     */
    const removeFromCart = async (product_id: number): Promise<void> => {
        setIsLoading(true);

        try {
            const cart = await getCart();
            const updatedCart = cart.filter((orderLine) => orderLine.product_id !== product_id);
            await setCart(updatedCart);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la mise à jour échoue.
     */
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
            const cart = await readCart();
            const existingOrderLineIndex = cart.findIndex((orderLine) => orderLine.product_id === product_id);

            if (existingOrderLineIndex === -1) {
                throw new Error("Product not found in cart");
            }

            const orderLine = cart[existingOrderLineIndex];
            orderLine.quantity = quantity;

            if (orderLine.product) {
                orderLine.price = (await getPriceInclVat(orderLine.product)) * quantity;
            }

            await writeCart(cart);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si le calcul échoue.
     */
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
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * @throws {Error} Si la mise à jour échoue.
     */
    const validateCartSendOrder = async (): Promise<void> => {
        setIsLoading(true);

        try {
            await createOrder(await readCart());
            await writeCart(new Array<OrderLine>());
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        getCart,
        setCart,
        clearCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        validateCartSendOrder
    };
}
