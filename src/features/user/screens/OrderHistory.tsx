import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { exportStyles } from '../../../App';
import Cart from '../../../components/Cart';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import useMeAPI from '../../../hooks/useMeAPI';
import { Purchase } from '../../../types/api';
import Loader from '../../../components/Loader';

export default function Account() {
  const navigation = useNavigation();
  const { getMyPurchases, isLoading, errorMessage } = useMeAPI();
  const [purchases, setPurchases] = useState<Array<Purchase>>([]);

  useEffect(() => {
    (async () => {
      try {
        const purchases = await getMyPurchases();
        setPurchases(purchases)
      } catch {
        Alert.alert(errorMessage ?? "Erreur inconnue");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.view1}>
        <Text style={styles.text1}>Historique de commandes</Text>
        {purchases.length === 0 ? (
          <Text style={styles.text2}>Aucune commande n'a été effectuée</Text>
        ) : (
          <Cart purchases={purchases}/>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '15%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  view1: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  text1: {
    fontSize: 24,
    fontFamily: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'bold'
  },
})
