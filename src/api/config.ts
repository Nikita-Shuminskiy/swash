import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const BASE_URL = 'https://s-wash.com/'

export const instance = axios.create({
	baseURL: BASE_URL,
})

instance.interceptors.request.use(
	async (config) => {
		return config
	},
	(error) => {
		Promise.reject(error)
	},
)

// Response interceptor for API calls
instance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			//@ts-ignore
			config.headers = {
				Authorization: `Authorization": "Bearer ${token}`,
			};
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);
