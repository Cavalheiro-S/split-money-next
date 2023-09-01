import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.request.use(config => {
    console.log(config);
    return config;
})