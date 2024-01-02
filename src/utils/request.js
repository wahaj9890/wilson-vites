// httpService.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'your_base_url', // Replace with your API base URL
});

// Add an interceptor to include the Authorization token in each request
instance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('currentUser'))?.contactLogin?.token;
    let culture = localStorage.getItem('userPreferredLanguage');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === 'post' || config.method === 'get') {
        config.headers['Content-Type'] = 'application/json';
    }
    // if (culture) {
    //     const separator = config.url.includes('?') ? '&' : '?'; // Use appropriate separator based on existing query parameters
    //     config.url = `${config.url}${separator}culture=${encodeURIComponent(culture)}`;
    //   }
    return config;
});

export default instance;
