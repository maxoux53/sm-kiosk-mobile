import { JSX, useEffect, useState } from "react";
import { Text, View, FlatList, Alert } from "react-native";
import OrderTable, { Item } from "../../components/OrderTable";
import { Order } from "../../types/items";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles";
import { connect } from "../../api/connect";

type OrderDetails = {
    id: number,
    date: string,
    event_id: number,
    event_name: string,
    items: Item[]
}

export default function OrderHistoryScreen(): JSX.Element {
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>();

    useEffect(() => {
        const getOrders = async () => {
            try {
                const orders = await connect<Order[]>("/interact/me/purchases", "GET");
                console.log(orders);
                let orderList: OrderDetails[] = [];
                for (const order of orders) {
                    let items: Item[]= [];
                    for (const orderLine of order.order_line) {
                        items.push({
                            id: orderLine.product_id,
                            label: orderLine.product.label,
                            picture: orderLine.product.picture,
                            quantity: orderLine.quantity,
                            price: Number(orderLine.price) / orderLine.quantity,
                            category_id: orderLine.product.category.id,
                            category_label: orderLine.product.category.label
                        })
                    }

                    orderList.push({
                        id: order.id,
                        date: new Date(order.date).toLocaleString(),
                        event_id: order.order_line[0].product.event.id,
                        event_name: order.order_line[0].product.event.name,
                        items: items
                    })
                }
                setOrderDetails(orderList);
            } catch(e) {
                Alert.alert(
                    "Erreur",
                    `Une erreur est survenue : ${e}`,
                    [
                        { text: "Ok" }
                    ]
                );
            }
        };
        getOrders();
    }, []);

    const renderOrder = ({ item }: { item: OrderDetails }) => (
        <View style={styles.orderContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.orderTitle}>{item.id} ({item.event_name})</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            {
                item.items ?(
                    <OrderTable 
                        items={item.items}
                        isCart={false}
                    />
                ): <></>
            }
            
        </View>
    );

    return (
        <SafeAreaView style={styles.whiteContainer} edges={["top"]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Historique des commandes</Text>
            </View>

            <FlatList
                data={orderDetails}
                renderItem={renderOrder}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}
