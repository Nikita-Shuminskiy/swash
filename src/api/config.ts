import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import {DataLoginType} from './authApi'
import {deviceStorage} from '../utils/storage/storage'

export const url = 'http://stirka.webd.pro/';

export const instance = axios.create({
    baseURL: url,
});

// Request interceptor for API calls


instance.interceptors.request.use(
    async (config) => {
        /*const accessToken = await AsyncStorage.getItem('token');
        //await CourierOrderStore.checkInternet()
        if (accessToken) {
            //@ts-ignore
            config.headers = {
                Authorization: `Bearer ${accessToken}`,
            };
        }*/
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptor for API calls
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
        /*        const {data} = await axios.post<DataLoginType>(`${url}auth/refresh`, {refreshToken: refreshToken});
                originalRequest.headers['Authorization'] = 'Bearer' + data.accessToken;
                await deviceStorage.saveItem('refreshToken', data.refreshToken)
                await deviceStorage.saveItem('accessToken', data.accessToken)*/
            } catch (e) {
                console.log(e, 'error interceptors')
            }

            return axios.request(originalRequest)


        }

        return Promise.reject(error);
    },
);
