import * as SecureStore from 'expo-secure-store';

const SM_JWT_KEY: string = "token";

export const token = {
    write: async (jwt: string): Promise<void> => {
        await SecureStore.setItemAsync(SM_JWT_KEY, jwt);
    },
    read: async (): Promise<string | null> => {
        return await SecureStore.getItemAsync(SM_JWT_KEY);
    },
    clear: async (): Promise<void> => {
        await SecureStore.deleteItemAsync(SM_JWT_KEY);
    },
    doesExist: async (): Promise<boolean> => {
        return Boolean(await SecureStore.getItemAsync(SM_JWT_KEY));
    }
}
