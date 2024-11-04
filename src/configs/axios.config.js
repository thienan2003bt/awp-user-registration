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
}, async (error) => {
    const data = error?.response?.data;
    let msg = data?.message ?? "";

    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && error.response.data.message === 'Token has expired!') {
      // Token has expired, request a new token pair
        try {
            const response = await instance.get('/user/invoke-new-tokens');
            if (!response || !response.data || !response.data.accessToken) {
                throw new  Error('Cannot calling API for refreshing tokens');
            }
            
            originalRequest.headers['Authorization'] = `${response.data.accessToken}`;

            return instance(originalRequest);
        } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            window.location.href = '/login';
        }
    }

    return data ?? Promise.reject(new Error(msg ?? ''));
});

export default instance;