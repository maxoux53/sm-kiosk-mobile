import { View, Text, StyleSheet } from 'react-native'

export default function Cart() {
  return (
    <>
      <View style={styles.view1}>
        <View>
          <Text>Photo</Text>
        </View>
        <View>
          <Text>Catégorie</Text>
          <Text>Nom du produit</Text>
          <Text>Quantité</Text>
        </View>
        <View>
          <Text>Prix</Text>
        </View>
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
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  view2: {
    width: '80%',
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
})
