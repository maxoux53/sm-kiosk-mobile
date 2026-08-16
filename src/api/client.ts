import axios, { AxiosInstance } from "axios";
import { token } from "./secureStore";

const API_BASE_URL = "https://sm-kiosk-production.up.railway.app/v1/";
export const API_INTERACT_ROUTE = "interact/";

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

apiClient.interceptors.request.use(async (config) => {
    const jwt = await token.read();

    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
});
