import { type JSX } from "react";
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";

import EventsScreen from "./EventsScreen";
import ProductsScreen from "./ProductsScreen";
import OrderScreen from "./OrderScreen";
import AccountScreen from "./AccountGroup/AccountStack";
import { TabBarParamList } from "../types/navigation";
import { useAuth } from "../contexts/AuthContext";

import DevOnly from "./DevOnlyScreen";

const Tab = createNativeBottomTabNavigator<TabBarParamList>();

export default function TabBar(): JSX.Element {
    const { isLoggedIn, isMember, login, logout, joinEvent, leaveEvent } = useAuth();

    return (
        <Tab.Navigator initialRouteName="Compte">
            <Tab.Screen
                name="Evenements"
                component={EventsScreen}
                options={{
                    tabBarIcon: () => ({ sfSymbol: "calendar" }),
                    tabBarLabel: "Événements",
                    tabBarItemHidden: !isLoggedIn
                }}
            />
            <Tab.Screen
                name="Produits"
                component={ProductsScreen}
                options={{
                    tabBarIcon: () => ({
                        sfSymbol: "takeoutbag.and.cup.and.straw.fill"
                    }),
                    tabBarItemHidden: !isMember || !isLoggedIn
                }}
            />
            <Tab.Screen
                name="Commande"
                component={OrderScreen}
                options={{
                    tabBarIcon: () => ({ sfSymbol: "cart.badge.clock.fill" }),
                    tabBarItemHidden: !isMember || !isLoggedIn
                }}
            />
            <Tab.Screen
                name="Compte"
                component={AccountScreen}
                options={{
                    tabBarIcon: () => ({ sfSymbol: "person.crop.circle.fill" })
                }}
            />
            
            <Tab.Screen
                name="Hidden1"
                component={DevOnly}
                options={{
                    tabBarItemHidden: true,
                    title: "ToggleLogin",
                    //role: "search",
                    tabBarIcon: () => ({ sfSymbol: "lock.square.fill" })
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        if (isLoggedIn) {
                            logout();
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Hidden2"
                component={DevOnly}
                options={{
                    tabBarItemHidden: true,
                    title: "ToggleMember",
                    //role: "search",
                    tabBarIcon: () => ({ sfSymbol: "calendar.and.person" })
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        if (isMember) {
                            leaveEvent();
                        }
                    }
                }}
            />
        </Tab.Navigator>
    );
}
