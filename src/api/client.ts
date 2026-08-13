import axios from "axios";
import { token } from "./secureStore";

const API_BASE_URL: string = "https://sm-kiosk-production.up.railway.app/v1/";
export const API_INTERACT_ROUTE: string = "interact/";

export const apiClient = axios
    .create({
        baseURL: API_BASE_URL,
    })
    .interceptors.request.use(async (config) => {
        const jwt = await token.read();
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
    })
;
