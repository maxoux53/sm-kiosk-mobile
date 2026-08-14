import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { exportStyles } from '../../../App';

export default function Signup() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          <View style={styles.view1}>
            <Text style={{ fontSize: 32, fontFamily: 'bold'}}>S'enregistrer</Text>
            <View style={styles.view2}>
              <TextInput style={exportStyles.input} placeholder='Prénom' />
              <TextInput style={exportStyles.input} placeholder='Nom' />
              <TextInput style={exportStyles.input} placeholder='Email' />
              <TextInput style={exportStyles.input} placeholder='Mot de passe' />
              <TouchableOpacity style={exportStyles.button} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.text1}>S'enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    gap: 25,
  },
  view2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  text1: {
    color: 'white',
    fontSize: 16,
  },
});
