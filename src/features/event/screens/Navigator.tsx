import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Event from './Event';
import Camera from './Camera';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator initialRouteName='Event' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  )
}
