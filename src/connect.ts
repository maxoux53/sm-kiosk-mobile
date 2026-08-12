import axios from "axios";

export const url = 'sm-kiosk-production.up.railway.app/v1/';

export const axiosInstance = axios.create({
    baseURL: url,
});
