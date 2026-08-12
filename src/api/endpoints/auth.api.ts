import { axiosInstance } from "../../connect";

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post(`login`, {
        email,
        password,
    });
    return response;
};

export const signup = async (firstName: string, lastName: string, email: string, password: string, avatar: string) => {
    const response = await axiosInstance.post(`signup`, {
        firstName,
        lastName,
        email,
        password,
        avatar,
    });
    return response;
};
