import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { exportStyles } from '../../../App';
import { token } from '../../../api/secureStore';
import useMeAPI from '../../../hooks/useMeAPI';
import Loader from '../../../components/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
import { User } from '../../../types/api';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserId, setEventId } from '../../../store/slice';
import { checkError } from '../../../utils/checkError';

export default function Account() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | undefined>();
  const { getMyInfo, deleteMyAccount, isLoading } = useMeAPI();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const userTemp = await getMyInfo();
          setUser(userTemp);
          dispatch(setUserId(userTemp.id));
        } catch (e) {
          Alert.alert(checkError(e as Error))
        }
      })();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading && <Loader/>}
      <View style={styles.view1}>
        <Text style={styles.text1}>{user?.email}</Text>
        <Image source={{ uri: user?.avatar }} style={exportStyles.image} />
        <TouchableOpacity style={exportStyles.button} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.text2}>Historique des commandes</Text>
        </TouchableOpacity>
        <Button title="Se déconnecter" onPress={() => {
          dispatch(setUserId(undefined));
          dispatch(setEventId(undefined));
          token.clear();
        }} />
        <Button color="red" title="Supprimer mon compte" onPress={() => {
          Alert.alert("Attention", "Cette action est irréversible", [
            { text: "Annuler", style: "cancel" },
            {
              text: "Supprimer", onPress: async () => {
                try {
                  await deleteMyAccount();
                  dispatch(setUserId(undefined));
                  dispatch(setEventId(undefined));
                  token.clear();
                } catch (e) {
                  Alert.alert(checkError(e as Error))
                }
              },
            },
          ]);
        }} />
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
    alignItems: 'center',
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
