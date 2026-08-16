import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Cart from '../../../components/Cart';
import { OrderLine } from '../../../types/api';
import Loader from '../../../components/Loader';
import useCart from '../../../hooks/useCart';
import { exportStyles } from '../../../App';
import useMeAPI from '../../../hooks/useMeAPI';

export default function Order() {
  const navigation = useNavigation();
  const { getCart } = useCart();
  const {  } = useMeAPI();
  const [orderLines, setOrderLines] = useState<Array<OrderLine>>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setOrderLines(await getCart());
      })();
    }, [])
  )


  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Commandes</Text>
      <View style={styles.view1}>
        <Cart orderLines={orderLines} />
        <TouchableOpacity style={exportStyles.button}>
          <Text style={styles.text2}>Valider</Text>
        </TouchableOpacity>
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
})
