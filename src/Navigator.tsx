
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
import { setUserId } from './store/slice';
import Loader from './components/Loader';
import { setEvent } from './store/slice';


const Tab = createBottomTabNavigator();

export default function Navigator() {
  const { getMyInfo, getMyEvent, isLoading, errorMessage } = useMeAPI();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.Slice.userId);
  const event = useSelector((state: RootState) => state.Slice.event);

  useEffect(() => {
    (async () => {
      try {
        const user = await getMyInfo();
        dispatch(setUserId(user.id));
        const event = await getMyEvent();
        if (event) dispatch(setEvent(event));
      } catch {
        Alert.alert(errorMessage ?? "Erreur inconnue");
      }
    })();
  }, []);

  return (
    <NavigationContainer >
      {isLoading && <Loader/>}
      {userId !== undefined ? (
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
