import axios from 'axios';

export const axiosInstance = axios.create( {
    baseURL: "http://localhost:300/api/",
    withCredentials: true //to send cookies w requests
});

