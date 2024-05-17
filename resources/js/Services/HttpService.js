import axios from 'axios';
import { getToken } from './AuthService';

const HttpService = axios.create({
    // baseURL: '',
});

HttpService.interceptors.request.use(async (config) => {
    const token = getToken();
    
    if (!token) {
        return config;
    }
    
    config.headers.Authorization = `Bearer ${token}`;
    
    return config;
});

export default HttpService;