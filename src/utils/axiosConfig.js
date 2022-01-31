import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_End_Point
});

export default axiosInstance;