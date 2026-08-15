import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useCallback } from 'react';
import { useState, useRef } from 'react';
import useProductAPI from '../../../hooks/useProductAPI';
import useCategoryAPI from '../../../hooks/useCategoryAPI';
import { Product as ProductType, Category } from '../../../types/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import useMeAPI from '../../../hooks/useMeAPI';
import Loader from '../../../components/Loader';
import SegmentedControl from '@expo/ui/community/segmented-control';
import { Event } from '../../../types/api';
import { useFocusEffect } from '@react-navigation/native';
import useCart from '../../../hooks/useCart';

export default function Product() {
  const { getMyEvent, isLoading: isLoadingEvent, errorMessage: errorMessageEvent } = useMeAPI();
  const { getAllProductsByEvent, isLoading: isLoadingProducts, errorMessage: errorMessageProducts } = useProductAPI();
  const { getCategoriesByEvent, isLoading: isLoadingCategories, errorMessage: errorMessageCategories } = useCategoryAPI();
  const { addToCart} = useCart();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [event, setEvent] = useState<Event | undefined>();
  const eventId = useSelector((state: RootState) => state.Slice.eventId);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          if (eventId === undefined) return;
          setEvent(await getMyEvent());
          setCategories(await getCategoriesByEvent(eventId));
          setProducts(await getAllProductsByEvent(eventId));
        } catch {
          Alert.alert('Erreur', errorMessageCategories ?? errorMessageProducts ?? errorMessageEvent ?? 'Erreur inconnue');
        }
      })();
    }, [eventId])
  );

  return (
    <View style={styles.container}>
      {isLoadingEvent || isLoadingCategories || isLoadingProducts && <Loader />}
      <Text style={styles.text1}>{event?.name}</Text>
      <View style={styles.view1}>
        <SegmentedControl
          values={categories.map((category) => category.label)}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      </View>
      <View style={styles.view2}>
        {products.map((product) => {
          if (product.category?.id !== categories[selectedIndex]?.id) return null;
          return (
            <TouchableOpacity key={product.id} onPress={() => {
              Alert.prompt("Veuillez entrer la quantité", undefined, [
                {
                  text: "OK", onPress: async (value: string | undefined) => {
                    if (value) {
                      const quantity = parseInt(value);
                      if (!quantity) {
                        Alert.alert("La quantité doit être un nombre positif");
                      } else {
                        await addToCart(product.id, quantity);
                      }
                    }
                  }
                },
              ])
            }} style={styles.button}>
              <Image source={{ uri: product.picture }} style={styles.image} />
              <Text style={styles.text2}>{product.label}</Text>
              <Text style={styles.text3}>{product.excl_vat_price}€</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  view1: {
    width: '80%',
  },
  view2: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    gap: 20,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  text1: {
    fontSize: 32,
    fontFamily: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'regular',
    textAlign: 'left',
  },
  text3: {
    fontSize: 16,
    fontFamily: 'bold',
    textAlign: 'left',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
})
