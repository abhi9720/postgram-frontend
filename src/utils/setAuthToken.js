import axiosInstance from '../utils/axiosConfig'


// this going to set token every axios request by default
const setAuthToken = (token) => {
    if (token) {

        axiosInstance.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axiosInstance.defaults.headers.common["x-auth-token"];
    }
};

export default setAuthToken;
