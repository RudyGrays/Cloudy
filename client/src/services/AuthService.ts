import $api from '../http/api'

export default class AuthService {
	static async login(email, password) {
		return $api.post('/login', {
			email,
			password,
		})
	}

	static async register(first_name, last_name, email, password) {
		return $api.post('/register', {
			first_name,
			last_name,
			email,
			password,
		})
	}

	static async logout() {
		return $api.post('/logout')
	}
	static async checkToken() {
		return $api.post(`/checkToken`)
	}
}
