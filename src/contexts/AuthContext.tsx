import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from '../api/connect';
import { Alert } from 'react-native';

interface AuthContextType {
    isLoggedIn: boolean;
    isMember: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    login: (token: string, userId: number) => void;
    logout: () => void;
    joinEvent: (eventId: number) => void;
    leaveEvent: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMember, setIsMember] = useState(false);

    const login = async (token: string, userId: number) => { 
        setIsLoggedIn(true);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', userId.toString());
    };
    const logout = async () => {
        setIsLoggedIn(false);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
    };
    const joinEvent = async (eventId: number) => { 
        setIsMember(true);
        try {
            await AsyncStorage.setItem('eventId', eventId.toString());
            await connect("/interact/me", "GET"); 
        } catch (e) {
            Alert.alert(
                "Erreur",
                `Une erreur est survenue : ${e}`,
                [
                    { text: "Ok" }
                ]
            );
        }

    };
    const leaveEvent = async () => { 
        setIsMember(false); 
        await AsyncStorage.removeItem('eventId');
        await AsyncStorage.removeItem('cart')
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isMember,setIsLoggedIn , login, logout, joinEvent, leaveEvent }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth ne fonctionne que dans un AuthProvider');
    }

    return context;
};
