import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import { Product, Purchase } from '../types/api'
import { useState, useEffect } from 'react'
import useProductAPI from '../hooks/useProductAPI';
import { exportStyles } from '../App';

export default function Cart({ purchases }: { purchases: Array<Purchase> }) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const { getProduct, isLoading, errorMessage } = useProductAPI();

  useEffect(() => {
    (async () => {
      try {
        const productsTemp: Array<Product> = [];
        purchases.map((purchase) => {
          purchase.order_line.map(async (orderLine) => {
            const product = await getProduct(orderLine.product_id);
            if (product) {
              productsTemp.push(product);
            }
          })
        })
        setProducts(productsTemp);
      } catch {
        Alert.alert(errorMessage ?? "Une erreur est survenue");
      }
    })()
  }, [])

  return (
    <>
      <View style={styles.view1}>
        {
          purchases.map((purchase) => (
            purchase.order_line.map((orderLine) => (
              <View key={orderLine.purchase_id ?? "*" + orderLine.product_id} style={styles.view3}>
                <View>
                  <Image source={{uri: products.find((product) => product.id === orderLine.product_id)?.picture}} style={exportStyles.image} />
                </View>
                <View>
                  <Text>Catégorie</Text>
                  <Text>Nom du produit</Text>
                  <Text>{orderLine.quantity}</Text>
                </View>
                <View>
                  <Text>{orderLine.price}</Text>
                </View>
              </View>
            ))
          ))
        }
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Text>sous-total</Text>
          <Text>€</Text>
        </View>
        <View style={styles.view3}>
          <Text>Taxe</Text>
          <Text>€</Text>
        </View>
        <View style={styles.view3}>
          <Text>Total</Text>
          <Text>€</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  view1: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  view2: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 16,
  },
  view3: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
})
