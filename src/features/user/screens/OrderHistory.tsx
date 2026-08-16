import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import useMeAPI from '../../../hooks/useMeAPI';
import { Purchase } from '../../../types/api';
import Loader from '../../../components/Loader';
import Cart from '../../../components/Cart';

export default function Account() {
  const { getMyPurchases, isLoading, errorMessage } = useMeAPI();
  const [purchases, setPurchases] = useState<Array<Purchase>>([]);

  useFocusEffect(
    useCallback(() => {
    (async () => {
      try {
        const purchases = await getMyPurchases();
        setPurchases(purchases);
        Alert.alert("chargement", purchases[0].order_line[0].product?.excl_vat_price + "");
      } catch {
        Alert.alert(errorMessage ?? "Erreur inconnue");
        }
      })();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.view1}>
        <Text style={styles.text1}>Historique de commandes</Text>
        {purchases.length === 0 ? (
          <Text style={styles.text2}>Aucune commande n'a été effectuée</Text>
        ) : (
          <View style={styles.view2}>
            {
              purchases.map((purchase, index) => (
                <Cart key={index} orderLines={purchase.order_line} />
              ))
            }
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'white',
  },
  view1: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  view2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  text1: {
    fontSize: 24,
    fontFamily: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'bold',
    textAlign: 'center',
  },
})
