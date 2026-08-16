import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import delay from 'delay';

export default function Loader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (loading) {
        await delay(500);
        setLoading(false);
      }
    })();
  }, [])

  return (
    <View style={styles.View}>
      {loading && <ActivityIndicator size="large" color="#000000" />}
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
