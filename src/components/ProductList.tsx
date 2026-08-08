import { JSX, useRef, useState } from "react";
import { Text, Image, FlatList, TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ProductDetails } from "../types/items";
import { ProductBottomSheet } from "../components/ProductBottomSheet";

export default function ProductList(props: { products: ProductDetails[] }): JSX.Element {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);

    const handleProductPress = (item: ProductDetails) => {
        setSelectedProduct(item);
        bottomSheetRef.current?.present();
    };

    const afficheProduits = (item: ProductDetails) => (
        <TouchableOpacity style={{width: '48%'}} onPress={() => handleProductPress(item)}>
            <Image 
                source={{ uri: item.picture }} 
                style={{width: '100%', aspectRatio: 1, borderRadius: 12, marginBottom: 8}} 
            />
            <Text style={{fontSize: 16}}>{item.label}</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{(Number(item.excl_vat_price) * (1 + item.category.vat.rate / 100)).toFixed(2)}€</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <FlatList
                data={props.products}
                numColumns={2}
                renderItem={({ item }) => afficheProduits(item)}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
                showsVerticalScrollIndicator={false}
            />
            <ProductBottomSheet ref={bottomSheetRef} product={selectedProduct} />
        </>
    );
}
