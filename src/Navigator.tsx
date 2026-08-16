import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthNavigator from './features/auth/screens/Navigator';
import UserNavigator from './features/user/screens/Navigator';
import EventNavigator from './features/event/screens/Navigator';
import ProductNavigator from './features/product/screens/Navigator';
import OrderNavigator from './features/order/screens/Navigator';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { useEffect } from 'react';
import useMeAPI from './hooks/useMeAPI';
import { Alert } from 'react-native';
import { setUserId, setEventId } from './store/slice';
import Loader from './components/Loader';
import { token } from './api/secureStore';
import { isAxiosError } from 'axios';
import { Calendar, Box, ShoppingCart, User } from 'lucide-react-native';
import { checkError } from './utils/checkError';

const Tab = createBottomTabNavigator();

export default function Navigator() {
  const { getMyInfo, getMyEvent, isLoading } = useMeAPI();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.Slice.userId);
  const eventId = useSelector((state: RootState) => state.Slice.eventId);

  useEffect(() => {
    (async () => {
      if (!(await token.read())) return;
      try {
        const user = await getMyInfo();
        dispatch(setUserId(user.id));
      } catch (error) {
        if (isAxiosError(error) && error.response?.status !== 404) {
          Alert.alert(checkError(error as Error));
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (userId === undefined) return;
      try {
        if (eventId === undefined) {
          const event = await getMyEvent();
          dispatch(setEventId(event !== undefined ? event.id : undefined));
        }
      } catch (error) {
        if (isAxiosError(error) && error.response?.status !== 404) {
          Alert.alert(checkError(error as Error));
        }
      }
    })();
  }, [userId])

  return (
    <NavigationContainer >
      {isLoading && <Loader/>}
      {userId !== undefined ? (
        <Tab.Navigator initialRouteName='Utilisateur' screenOptions={{headerShown: false}}>
          <Tab.Screen name="Événement" component={EventNavigator} options={{tabBarIcon: ({color}) => <Calendar color={color}/>}}/>
        {eventId !== undefined && <Tab.Screen name="Produits" component={ProductNavigator} options={{tabBarIcon: ({color}) => <Box color={color}/>}}/>}
        {eventId !== undefined && <Tab.Screen name="Commande" component={OrderNavigator} options={{tabBarIcon: ({color}) => <ShoppingCart color={color}/>}}/>}
        <Tab.Screen name="Utilisateur" component={UserNavigator} options={{tabBarIcon: ({color}) => <User color={color}/>}}/>
        </Tab.Navigator>
    ) : (
        <AuthNavigator/>
      )}
    </NavigationContainer>
  );
}
