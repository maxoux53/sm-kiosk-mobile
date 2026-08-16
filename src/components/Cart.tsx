import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import { OrderLine } from '../types/api'
import { Vat } from '../types/api'
import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import useVatAPI from '../hooks/useVatAPI';
import Loader from './Loader';
import { checkError } from '../utils/checkError';

export default function Cart({ orderLines }: { orderLines: Array<OrderLine> }) {
  const [vats, setVats] = useState<Array<Vat>>([]);
  const { getAllVats, isLoading } = useVatAPI();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setVats(await getAllVats());
        } catch (e) {
          Alert.alert(checkError(e as Error))
        }
      })()
    }, [])
  )

  const { subTotal, vatAmount, total } = useMemo(() => {
    let subTotalCalc = 0;
    let vatAmountCalc = 0;
    let totalCalc = 0;

    if (orderLines && vats && vats.length > 0) {
      orderLines.forEach((orderLine) => {
        const excl = (orderLine.product?.excl_vat_price ?? 0) * orderLine.quantity;
        const rate = vats.find(v => v.type === orderLine.product?.category?.vat_type)?.rate ?? 0;
        const vat = Math.round((excl * (rate / 100)) * 100) / 100;
        subTotalCalc += excl;
        vatAmountCalc += vat;
        totalCalc += excl + vat;
      });
    }

    return {
      subTotal: Math.round(subTotalCalc * 100) / 100,
      vatAmount: Math.round(vatAmountCalc * 100) / 100,
      total: Math.round(totalCalc * 100) / 100
    };
  }, [orderLines, vats]);

  return (
    <View style={styles.view2}>
      <View style={styles.view1}>
        {isLoading && <Loader/>}
        {
          orderLines?.map((orderLine) => (
            <View key={orderLine.product_id} style={styles.view3}>
              <View>
                <Image source={{uri: orderLine.product?.picture}} style={styles.image} />
              </View>
              <View>
                <Text>{orderLine.product?.category?.label}</Text>
                <Text>{orderLine.product?.label}</Text>
                <Text>Quantité : {orderLine.quantity}</Text>
              </View>
              <View>
                <Text>{orderLine.product?.excl_vat_price}€</Text>
              </View>
            </View>
          ))
        }
      </View>
      {orderLines.length === 0 ? (
        <Text>Aucune commande</Text>
      ) : (
        <View style={styles.view2}>
          <View style={styles.view3}>
            <Text>sous-total</Text>
            <Text>{subTotal}€</Text>
          </View>
          <View style={styles.view3}>
            <Text>Taxe</Text>
            <Text>{vatAmount}€</Text>
          </View>
          <View style={styles.view3}>
            <Text>Total</Text>
            <Text>{total}€</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  view1: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
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
    width: 80,
    height: 80,
    borderRadius: 5,
  },
})
