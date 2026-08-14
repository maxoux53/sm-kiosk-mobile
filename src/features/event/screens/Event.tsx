import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { exportStyles } from '../../../App';
import { RootState } from '../../../store/store';
import Loader from '../../../components/Loader';
import { Alert, Image } from 'react-native';
import useMeAPI from '../../../hooks/useMeAPI';
import { setEvent } from '../../../store/slice';

export default function Event() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const { leaveEvent, isLoading, errorMessage } = useMeAPI();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const event = useSelector((state: RootState) => state.Slice.event);

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.view1}>
        {
          event !== undefined ? (
            <View style={styles.view2}>
              <Text style={styles.text1}>{event.name}</Text>
              <Image source={{ uri: event.image }} style={{ width: 200, height: 200, borderRadius: 10 }} />
              <TouchableOpacity
                style={exportStyles.button}
                onPress={async () => {
                  try {
                    await leaveEvent(event.id);
                    dispatch(setEvent(undefined));
                  } catch {
                    Alert.alert('Erreur', errorMessage ?? 'Impossible de quitter l\'évènement');
                  }
                }}>
                <Text style={styles.text2}>Quitter l'évènement</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.view2}>
              <Text style={styles.text1}>Rejoindre un évènement</Text>
              <TouchableOpacity
                style={exportStyles.button}
                onPress={() => {
                  if (cameraPermission?.granted) {
                    navigator.navigate('Camera');
                  } else {
                    requestCameraPermission();
                  }
                }}>
                <Text style={styles.text2}>Scanner un QR code</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
  view2: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  text1: {
    fontSize: 24,
    fontFamily: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: 'white',
  },
})
