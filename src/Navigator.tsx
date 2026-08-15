
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
import { setUser, setEvent } from './store/slice';
import Loader from './components/Loader';
import { token } from './api/secureStore';
import { AxiosError, isAxiosError } from 'axios';

const Tab = createBottomTabNavigator();

export default function Navigator() {
  const { getMyInfo, getMyEvent, isLoading, errorMessage } = useMeAPI();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.Slice.user);
  const event = useSelector((state: RootState) => state.Slice.event);

  useEffect(() => {
    (async () => {
      if (!(await token.read())) return;
      try {
        const user = await getMyInfo();
        dispatch(setUser(user));
        const event = await getMyEvent();
        dispatch(setEvent(event));
      } catch (error) {
        if (isAxiosError(error) && error.response?.status !== 404) {
          Alert.alert(errorMessage ?? error.response?.statusText.toString()!);
        }
      }
    })();
  }, []);

  return (
    <NavigationContainer >
      {isLoading && <Loader/>}
      {user !== undefined ? (
        <Tab.Navigator initialRouteName='User' screenOptions={{headerShown: false}}>
        <Tab.Screen name="Event" component={EventNavigator} />
        {
          event !== undefined ? (
            <>
              <Tab.Screen name="Product" component={ProductNavigator} />
              <Tab.Screen name="Order" component={OrderNavigator} />
            </>
          ) : null
        }
        <Tab.Screen name="User" component={UserNavigator} />
        </Tab.Navigator>
    ) : (
        <AuthNavigator/>
      )}
    </NavigationContainer>
  );
}
