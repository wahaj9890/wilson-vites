// // request.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://your-api-base-url.com', // Replace with your API base URL
// });

// export const httpGet = async (url, params = {}) => {
//   try {
//     const response = await api.get(url, { params });
//     return response.data;
//   } catch (error) {
//     console.error('GET request error:', error);
//     throw error; // Re-throw to handle in components
//   }
// };

// export const httpPost = async (url, data) => {
//   try {
//     const response = await api.post(url, data);
//     return response.data;
//   } catch (error) {
//     console.error('POST request error:', error);
//     throw error; // Re-throw to handle in components
//   }
// };














// httpService.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'your_base_url', // Replace with your API base URL
});

// Add an interceptor to include the Authorization token in each request
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    let culture = localStorage.getItem('userPreferredLanguage');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Include Content-Type header for POST requests
    if (config.method === 'post') {
        config.headers['Content-Type'] = 'application/json';
    }
    if (culture === null || culture === undefined) {
        culture = 'en'
    } else {
        config.headers['Accept-Language'] = culture;

    }

    return config;
});

export default instance;
