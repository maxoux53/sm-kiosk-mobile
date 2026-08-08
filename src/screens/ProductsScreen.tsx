import { useEffect, useMemo, useState, type JSX } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { styles } from "../styles";
import EventNameHeader from "../components/EventNameHeader";
import ProductList from "../components/ProductList";
import { Category, Event, ProductDetails } from "../types/items";
import { connect } from "../api/connect";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductsScreen(): JSX.Element {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>();
    const [products, setProduct] = useState<ProductDetails[]>();
    const [event, setEvent] = useState<Event>();
    
    useEffect(() => {
        const getData = async () => {
            try {
                setCategories(await connect<Category[]>("/interact/category/", "GET"));
                const eventId = Number(await AsyncStorage.getItem('eventId'));
                setProduct(await connect<ProductDetails[]>(`/interact/event/${eventId}/products`, "GET"));
                console.log(products);
                setEvent(await connect<Event>(`/interact/event/${eventId}/`, "GET"))
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
        getData();
    }, [selectedIndex]);

    console.log(products);

    const productsByCategory = useMemo(() => {
        if (!categories || !products) return [];
        return categories.map(category => 
            products.filter(product => product.category.id === category.id)
        );
    }, [categories, products]);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {
                event && categories && products ? (
                    <>
                        <EventNameHeader name={event.name} image={event.image} />

                        <SegmentedControl
                            values={categories.map(c => c.label)}
                            selectedIndex={selectedIndex}
                            onChange={(event) => {
                                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                            }}
                            tintColor="white"
                            style={{ width: "70%", marginVertical: 20 }}
                        />

                        <ProductList products={productsByCategory[selectedIndex]} />
                    </>
                ) : <></>
            }
            
        </SafeAreaView>
    );
}
