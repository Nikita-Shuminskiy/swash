import axios from 'axios'

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
instance.interceptors.response.use(
	(response) => {
		return response
	},
	async function(error) {
		return Promise.reject(error)
	},
)
