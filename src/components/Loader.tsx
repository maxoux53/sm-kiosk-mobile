import { ActivityIndicator, StyleSheet } from 'react-native';

export default function Loader() {
  return (
    <ActivityIndicator size="large" color="#000000" style={styles.loader} />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    zIndex: 999,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    top: "50%",
    left: "50%",
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
});
