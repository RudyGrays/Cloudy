import axios from 'axios'

const $api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_API_URL,
	validateStatus: status => {
		return true
	},
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	config.headers.Accept = 'application/json'
	return config
})

export default $api
