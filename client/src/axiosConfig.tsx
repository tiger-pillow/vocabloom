import axios, { AxiosInstance } from "axios";
var axiosConfig: AxiosInstance; 

if (process.env.NODE_ENV === "production" ){
    console.log("NODE ENV = PRODUCTION, in AxiosConfig")
    axiosConfig = axios.create({
        baseURL: process.env.baseURL,
        withCredentials: true,
    });
} else {
    axiosConfig = axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true,
    });
}


export default axiosConfig;
