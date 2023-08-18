import axios from 'axios'

export const url = 'https://s-wash.com/'

export const instance = axios.create({
	baseURL: url,
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
