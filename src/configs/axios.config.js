import axios from 'axios';
import LocalStorageHelper from '../helpers/localstorage.helper';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});

//REQUEST INTERCEPTOR
instance.interceptors.request.use((config) => {
    const token = LocalStorageHelper.getItem('user')?.accessToken;
    if (token) {
        config.headers['Authorization'] = `${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});


//RESPONSE INTERCEPTOR
instance.interceptors.response.use((response) => {
    return response.data;
}, async (error) => {
    const data = error?.response?.data;
    let msg = data?.message ?? "";

    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && error.response.data.message === 'Token has expired!') {
        try {
            const response = await instance.get('/user/invoke-new-tokens');
            if (!response || !response.data || !response.data.accessToken) {
                throw new Error('Cannot calling API for refreshing tokens');
            }
            
            LocalStorageHelper.setItem('user', {
                id: response?.data?.user?.id,
                accessToken: response?.data?.accessToken,
            });

            return instance(originalRequest);
        } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            window.location.href = '/login';
        }
    }

    return data ?? Promise.reject(new Error(msg ?? ''));
});

export default instance;