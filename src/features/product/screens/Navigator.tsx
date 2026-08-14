import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './Product';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator initialRouteName='Product' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  )
}
