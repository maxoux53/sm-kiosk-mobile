import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
