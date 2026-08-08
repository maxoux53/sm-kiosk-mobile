import { JSX, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderTable, { Item } from "../components/OrderTable";
import { styles } from "../styles";
import { CartItem, useCart } from "../contexts/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "../api/connect";
import { Category, Product, ProductDetails, VAT } from "../types/items";


export default function OrderScreen(): JSX.Element {
    const {items} = useCart();
    const [orderItems, setOrderItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            const cart = await AsyncStorage.getItem('cart');
            const itemList: CartItem[] = cart ? JSON.parse(cart) : [];
            let newOderItems: Item[] = [] 
            
            for (const item of itemList) {
                try {
                    const product = await connect<ProductDetails>(`/interact/product/${item.product_id}`, "GET");

                    newOderItems.push({
                        id: product.id,
                        label: product.label,
                        picture: product.picture,
                        quantity: item.quantity,
                        price: Number(((Number(product.excl_vat_price) * (1 + product.category.vat.rate / 100)).toFixed(2))),
                        category_id: product.category.id,
                        category_label: product.category.label
                    })
                } catch(e) {
                    Alert.alert(
                        "Erreur",
                        `Une erreur est survenue : ${e}`
                    );
                }
            }

            setOrderItems(newOderItems);
        };
        fetchCart();
    }, [items])

    return (
        <SafeAreaView style={styles.flexContainer} edges={["top"]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Commande</Text>
            </View>

            <OrderTable 
                items={orderItems}
                isCart={true}
            />
        </SafeAreaView>
    );
}

