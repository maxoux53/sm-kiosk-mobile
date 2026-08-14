import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from './Account';
import OrderHistory from './OrderHistory';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator initialRouteName='Account' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
    </Stack.Navigator>
  )
}
