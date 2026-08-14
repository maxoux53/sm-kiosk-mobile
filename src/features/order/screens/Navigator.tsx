import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Order from './Order';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator initialRouteName='Order' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  )
}
