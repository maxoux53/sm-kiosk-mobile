import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { exportStyles } from '../../../App';

export default function Account() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text1}>Email</Text>
        <TouchableOpacity style={exportStyles.button} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.text2}>Historique des commandes</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
