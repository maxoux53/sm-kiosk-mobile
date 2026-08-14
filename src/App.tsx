import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigator from './Navigator';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigator />
        </Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const exportStyles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: 16,
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#dbdbdb',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
