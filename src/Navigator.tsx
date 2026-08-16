
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
import { AxiosError, isAxiosError } from 'axios';

const Tab = createBottomTabNavigator();

export default function Navigator() {
  const { getMyInfo, getMyEvent, isLoading, errorMessage } = useMeAPI();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.Slice.userId);
  const eventId = useSelector((state: RootState) => state.Slice.eventId);

  useEffect(() => {
    (async () => {
      if (!(await token.read())) return;
      try {
        const user = await getMyInfo();
        dispatch(setUserId(user.id));
        const event = await getMyEvent();
        dispatch(setEventId(event !== undefined ? event.id : undefined));
      } catch (error) {
        if (isAxiosError(error) && error.response?.status !== 404) {
          Alert.alert(errorMessage ?? error.response?.statusText?.toString() ?? "Erreur inconnue");
        }
      }
    })();
  }, [eventId, userId]);

  return (
    <NavigationContainer >
      {isLoading && <Loader/>}
      {userId !== undefined ? (
        <Tab.Navigator initialRouteName='User' screenOptions={{headerShown: false}}>
        <Tab.Screen name="Event" component={EventNavigator} />
        {eventId !== undefined && <Tab.Screen name="Product" component={ProductNavigator} />}
        {eventId !== undefined && <Tab.Screen name="Order" component={OrderNavigator} />}
        <Tab.Screen name="User" component={UserNavigator} />
        </Tab.Navigator>
    ) : (
        <AuthNavigator/>
      )}
    </NavigationContainer>
  );
}
