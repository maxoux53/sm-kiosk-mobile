import axios from "axios";

const API_BASE_URL = "https://sm-kiosk-production.up.railway.app/v1/";
export const API_INTERACT_ROUTE = "interact/";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
});
