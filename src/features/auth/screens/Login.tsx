import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { exportStyles } from '../../../App';
import useAuthAPI from '../../../hooks/useAuthAPI';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/slice';
import Loader from '../../../components/Loader';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { login, isLoading, errorMessage } = useAuthAPI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      dispatch(setUser(response.user));
    } catch {
      Alert.alert(errorMessage ?? 'Une erreur est survenue');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.view1}>
        <Text style={styles.text1}>Se connecter</Text>
        <View style={styles.view2}>
          <TextInput style={exportStyles.input} placeholder='Email' onChangeText={setEmail} />
          <TextInput style={exportStyles.input} placeholder='Mot de passe' onChangeText={setPassword} />
          <TouchableOpacity style={exportStyles.button} onPress={handleLogin} disabled={isLoading}>
            <Text style={styles.text2}>Se connecter</Text>
          </TouchableOpacity>
          <Button title="S'enregistrer" onPress={() => navigation.navigate('Signup')} />
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
    fontSize: 30,
    fontFamily: 'bold',
  },
  text2: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'bold',
  },
});
