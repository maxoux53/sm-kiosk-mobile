import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Cart from '../../../components/Cart';

export default function Order() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Commandes</Text>
      <Cart />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text1: {
    fontSize: 24,
    fontFamily: 'bold',
    textAlign: 'center',
  },
})
