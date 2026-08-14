import { CameraView } from "expo-camera";
import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { exportStyles } from "../../../App";
import { useDispatch } from "react-redux";
import { setEvent } from "../../../store/slice";
import { useRef } from 'react';
import useEventAPI from '../../../hooks/useEventAPI';
import Loader from "../../../components/Loader";
import useMeAPI from "../../../hooks/useMeAPI";

export default function Camera() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const isProcessingRef = useRef(false);
  const { getEvent, isLoading: isLoadingEvent, errorMessage: errorMessageEvent } = useEventAPI();
  const { joinEvent, isLoading: isLoadingJoin, errorMessage: errorMessageJoin } = useMeAPI();

  return (
    <View style={styles.container}>
      {isLoadingEvent || isLoadingJoin && <Loader/>}
      <CameraView facing='back' onBarcodeScanned={async (event) => {
        try {
          if (isProcessingRef.current) return;

          const id = Number(event.data)
          if (isNaN(id) || id === undefined) {
            return;
          }
          dispatch(setEvent(await getEvent(id)));
          await joinEvent(id);
          isProcessingRef.current = true;
          navigator.goBack();
        } catch {
          Alert.alert(errorMessageEvent ?? errorMessageJoin ?? 'Erreur inconnue');
          isProcessingRef.current = false;
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
