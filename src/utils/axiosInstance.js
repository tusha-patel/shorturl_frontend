// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://shorturl-node-988e.vercel.app',
      withCredentials: true, // ✅ sends cookies with every request

});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth tokens or other request modifications here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle known HTTP error statuses
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 400:
                    console.error('Bad Request:', error.response.data?.message || 'Invalid request');
                    break;
                case 401:
                    console.error('Unauthorized:', error.response.data?.message || 'Please login again');
                    break;
                case 403:
                    console.error('Forbidden:', error.response.data?.message || 'Access denied');
                    break;
                case 404:
                    console.error('Not Found:', error.response.data?.message || 'Resource not found');
                    break;
                case 500:
                    console.error('Server Error:', error.response.data?.message || 'Internal server error');
                    break;
                default:
                    console.error('Error:', error.response.data?.message || 'Something went wrong');
            }
        } else if (error.request) {
            // No response received
            console.error('Network error or no response from server');
        } else {
            // Other errors
            console.error('Axios Error:', error.message);
        }

        // Optionally, you can return a rejected Promise to handle in calling code
        return Promise.reject({
            message: error?.response?.data?.message || error.message || 'Something went wrong',
            status: error?.response?.status || null,
            data: error?.response?.data || null,
            code: error.code || null,
            isAxiosError: error.isAxiosError,
        });
    }
);

export default axiosInstance;
