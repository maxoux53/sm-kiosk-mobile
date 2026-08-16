import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.View}>

    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
