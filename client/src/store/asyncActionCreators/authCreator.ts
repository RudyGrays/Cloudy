import { AppDispatch } from '..'
import AuthService from '../../services/AuthService'
import { authSlice } from '../reducers/AuthSlice'

export const register =
	(first_name: String, last_name: String, email: String, password: String) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(authSlice.actions.registerFetching())
			const response = await AuthService.register(
				first_name,
				last_name,
				email,
				password
			)
			if (response.data.success == false) {
				return dispatch(authSlice.actions.registerFailed(response.data.message))
			}
			dispatch(authSlice.actions.registerSuccess())
		} catch (e) {
			console.error(e)
		}
	}

export const login =
	(email: String, password: String) => async (dispatch: AppDispatch) => {
		dispatch(authSlice.actions.loginFetching())
		const response = await AuthService.login(email, password)
		if (response.data.success == false) {
			return dispatch(authSlice.actions.loginFailed(response.data.message))
		}
		dispatch(authSlice.actions.loginSuccess(response.data.userDTO))
		localStorage.setItem('token', response.data.token)
	}

export const logout = () => async (dispatch: AppDispatch) => {
	dispatch(authSlice.actions.logoutFetching())
	const response = await AuthService.logout()
	if (response.data.success == false) {
		return dispatch(authSlice.actions.logoutFailed(response.data.message))
	}
	if (response.status == 401) return console.log('Не получилось')
	dispatch(authSlice.actions.logoutSuccess())
	localStorage.removeItem('token')
}

export const checkToken = () => async (dispatch: AppDispatch) => {
	dispatch(authSlice.actions.checkTokenFetching())
	const response = await AuthService.checkToken()

	localStorage.setItem('token', response.data.token)
	if (response.status == 401) {
		localStorage.removeItem('token')
		return dispatch(authSlice.actions.checkTokenFailed(response.data.message))
	}
	dispatch(authSlice.actions.checkTokenSuccess(response.data.userDTO))
}
