import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Cart from '../../../components/Cart';
import { OrderLine } from '../../../types/api';
import Loader from '../../../components/Loader';
import useCart from '../../../hooks/useCart';
import { exportStyles } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { checkError } from '../../../utils/checkError';

export default function Order() {
  const navigation = useNavigation();
  const { getCart, clearCart, validateCartSendOrder, isLoading } = useCart();
  const [orderLines, setOrderLines] = useState<Array<OrderLine>>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setOrderLines(await getCart());
      })();
    }, [])
  )

  const validateOrder = async () => {
    try {
      await validateCartSendOrder();
      Alert.alert("Commande validée avec succès");
      navigation.navigate('Utilisateur');
    } catch (e) {
      Alert.alert(checkError(e as Error))
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader/>}
      <Text style={styles.text1}>Commandes</Text>
      <View style={styles.view1}>
        <Cart orderLines={orderLines} />
        <View style={styles.view2}>
          <TouchableOpacity style={exportStyles.button} disabled={orderLines.length === 0} onPress={validateOrder}>
            <Text style={styles.text2}>Valider</Text>
          </TouchableOpacity>
          {orderLines.length > 0 && <Button title="Vider le panier" color="red" onPress={async () => {
            await clearCart();
            navigation.navigate('Produits');
          }} />}
        </View>
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
  text1: {
    fontSize: 24,
    fontFamily: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  view1: {
    flex: 1,
    paddingBottom: 16,
    paddingTop: 16,
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
})
