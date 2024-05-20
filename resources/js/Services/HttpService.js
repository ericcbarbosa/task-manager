import axios from 'axios';
import { getToken } from './AuthService';
import {ToastService} from "@/Services/ToastService.js";

const HttpService = axios.create({
    baseURL: '',
});

const getErrorMessage = (error) => {
    if (error?.response?.data?.message) {
        if (Array.isArray(error?.response?.data?.message)) {
            return error?.response?.data?.message.join(', ')
        }

        return error?.response?.data?.message;
    }

    if (error?.message?.message) {
        return error?.message?.message;
    }

    if (error?.response.status >= 500) {
        return 'Ops! A server error occured. Please try again.'
    }

    if (error?.response.status === 404) {
        return 'Ops! The data you are trying to get was not found.'
    }

    if (error?.response.status === 401) {
        return 'Ops! Your`re not allowed to perform this operation.'
    }

    return 'Ops! A error ocurred. Please try again.';
}

const onFulfilled = async (config) => {
    const token = getToken();

    if (!token) {
        return config;
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
};

const onRejected = async (error) => {
    ToastService.error(getErrorMessage(error));

    return Promise.reject(error);
};

HttpService.interceptors.request.use(onFulfilled, onRejected);

HttpService.interceptors.response.use(
    (response) => response,
    onRejected,
);

export default HttpService;