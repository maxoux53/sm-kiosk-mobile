import { JSX, useRef, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useBottomTabBarHeight } from "react-native-bottom-tabs";
import { styles } from "../styles";
import { connect } from "../api/connect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, useCart } from "../contexts/CartContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ProductBottomSheet } from "./ProductBottomSheet";
import { ProductDetails } from "../types/items";
import { it } from "node:test";

export type Item = {
    id: number,
    label: string,
    picture: string,
    quantity: number,
    price: number,
    category_id: number,
    category_label: string,
}

interface OrderTableProps {
    items: Item[],
    isCart: boolean
}

export default function OrderTable(props: OrderTableProps): JSX.Element {
    const {removeFromCart, clearCart} = useCart();
    const tabBarHeight = useBottomTabBarHeight();

    const items = props.items;
    const isCart = props.isCart;
    const total = (items ?? []).reduce((sum, item) => sum + item.price * item.quantity, 0);

    const renderItem = ({ item }: { item: Item }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                disabled={!isCart}
                onPress={() => {
                    Alert.alert(
                        "Sruppression d'un article",
                        `Voulez-Vous vraiment supprimer cette article : ${item.label} x${item.quantity}`,
                        [
                            { text: "Confirmer", onPress: (() => removeFromCart(item.id))},
                            { text: "Annuler", style: "cancel" }
                        ]
                    );
                }}
            >
                <Image source={{ uri: item.picture }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemCategory}>{item.category_label}</Text>
                    <Text style={styles.itemName}>{item.label}</Text>
                    <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>{(item.quantity * item.price).toFixed(2)}€</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.flexContainer}>
            <View style={styles.listHeader}>
                <Text style={styles.columnHeaderArticle}>ARTICLES</Text>
                <Text style={styles.columnHeaderDescription}>DESCRIPTION</Text>
                <Text style={styles.columnHeaderPrice}>PRIX</Text>
            </View>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flexContainer}
                contentContainerStyle={styles.orderTableListContent}
                scrollEnabled={isCart}
            />

            <View style={[styles.summaryContainer, { paddingBottom: 20 + (isCart ? tabBarHeight : 0) }]}>
                <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>{total.toFixed(2)}€</Text>
                </View>

                {isCart ?
                    <TouchableOpacity style={styles.orderButton} onPress={async () => {
                        try {
                            const cart = await AsyncStorage.getItem('cart');
                            const itemList: CartItem[] = cart ? JSON.parse(cart) : [];

                            if (itemList.length === 0) {
                                Alert.alert("Panier vide", "Veuillez ajouter des produits dans votre panier avant de passer commande.");
                            } else if (itemList) {
                                await connect("/interact/me/purchase", "POST", {order_lines: itemList})
                                Alert.alert("Commande effectuée", "Votre commande a bien été effectuée.");
                                clearCart();
                            }
                            
                        } catch(e) {
                            Alert.alert("Échec du payement", "Le payement a échoué. Veuillez réessayer : " + e);
                        }
                    }}>
                        <Text style={styles.orderButtonText}>Commander</Text>
                    </TouchableOpacity>
                : null}
            </View>
        </View>
    );
}
