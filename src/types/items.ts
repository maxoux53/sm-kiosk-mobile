export type Product = {
    id: number;
    label: string;
    excl_vat_price: number;
    picture: string;
    category_id: number;
};

export type ProductDetails = {
    category: {
        id: number,
        label: string,
        vat: {
            type: string,
            rate: number
        }
    }
    id: number
    excl_vat_price: string,
    is_available: boolean,
    label: string,
    picture: string
}

export type Category = {
    id: number;
    label: string;
    type: string;
};

export type VAT = {
    type: string;
    rate: number;
};

export type Event = {
    id: number;
    name: string;
    image: string;
};

export type OrderItem = {
    productId: number;
    quantity: number;
};

export type Order = {
    id: number;
    date: string;
    order_line: {
        product_id: number,
        quantity: number,
        price: number | string,
        product: {
            label: string,
            picture: string,
            event: {
                id: number,
                name: string
            },
            category: {
                id: number
                label: string
            }
        }
    }[]
}