import { CameraView } from "expo-camera";
import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { exportStyles } from "../../../App";
import { useRef } from 'react';
import Loader from "../../../components/Loader";
import useMeAPI from "../../../hooks/useMeAPI";
import { useDispatch } from 'react-redux';
import { setEventId } from "../../../store/slice";

export default function Camera() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const isProcessingRef = useRef(false);
  const { joinEvent, isLoading, errorMessage } = useMeAPI();

  return (
    <View style={styles.container}>
      {isLoading && <Loader/>}
      <CameraView facing='back' onBarcodeScanned={async (event) => {
        if (isProcessingRef.current) return;

        const id = Number(event.data);
        if (isNaN(id)) return;

        isProcessingRef.current = true;

        try {
          await joinEvent(id);
          dispatch(setEventId(id));
          navigator.goBack();
        } catch {
          Alert.alert(errorMessage ?? 'Erreur inconnue', undefined, [{ text: 'OK', onPress: () => { isProcessingRef.current = false; } }]);
        }
      }} barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }} style={StyleSheet.absoluteFill} />
      <TouchableOpacity
        style={[exportStyles.button, styles.button]}
        onPress={() => navigator.goBack()}>
        <Text style={styles.text}>Fermer la caméra</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 24,
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
  },
});
