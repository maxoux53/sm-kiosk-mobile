import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useRef } from 'react';
import SegmentedControl from '@expo/ui/community/segmented-control';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import useProductAPI from '../../../hooks/useProductAPI';
import useCategoryAPI from '../../../hooks/useCategoryAPI';
import { Product as ProductType, Category } from '../../../types/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


const Tab = createBottomTabNavigator();

export default function Product() {
  const { getAllProductsByEvent, isLoading: isLoadingProducts, errorMessage: errorMessageProducts } = useProductAPI();
  const { getCategoriesByEvent, isLoading: isLoadingCategories, errorMessage: errorMessageCategories } = useCategoryAPI();
  const bottomSheetRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const event = useSelector((state: RootState) => state.Slice.event);

  useEffect(() => {
    (async () => {
      try {
        if (!event?.id) return;
        //setCategories(await getCategoriesByEvent(event.id));
        setProducts(await getAllProductsByEvent(event.id));
      } catch (e) {
        Alert.alert('Erreur', errorMessageCategories ?? errorMessageProducts ?? e.message);
      }
    })();
  }, [event]);

  return isLoadingProducts || isLoadingCategories ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
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
          if (product.category_id !== categories[selectedIndex]?.id) return null;
          return (
            <TouchableOpacity key={product.id} style={styles.button}>
              <Image source={{ uri: product.picture }} style={{ width: 100, height: 100, borderRadius: 5 }} />
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
})
