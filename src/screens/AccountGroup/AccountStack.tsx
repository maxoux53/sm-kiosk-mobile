import { JSX } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AccountStackParamList } from "../../types/navigation";
import { useAuth } from "../../contexts/AuthContext";

import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import OrderHistoryScreen from "./OrderHistoryScreen";
import RegisterScreen from "./RegisterScreen";

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function AccountStack(): JSX.Element {
    const { isLoggedIn } = useAuth();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {isLoggedIn ? (
                <>
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                    />

                    <Stack.Screen
                        name="OrderHistory"
                        component={OrderHistoryScreen}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}
