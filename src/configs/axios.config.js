import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

//REQUEST INTERCEPTOR
instance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
});


//RESPONSE INTERCEPTOR
instance.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    const data = err?.response?.data;
    let msg = data?.message ?? "";

    return data ?? Promise.reject(new Error(msg ?? ''));
});

export default instance;