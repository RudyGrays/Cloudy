import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuth: false,
	currentUser: {},
	isLoading: false,
	errors: [],
}
export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload
		},
		setErrors: (state, action) => {
			state.errors = action.payload
		},
		loginFetching: state => {
			state.isLoading = true
		},
		loginFailed: (state, action) => {
			state.isLoading = false
			state.errors = action.payload
		},
		loginSuccess: (state, action) => {
			state.isLoading = false
			state.currentUser = action.payload
			state.errors = []
			state.isAuth = true
		},
		registerFetching: state => {
			state.isLoading = true
		},
		registerFailed: (state, action) => {
			state.isLoading = false
			state.errors = action.payload
		},
		registerSuccess: state => {
			state.isLoading = false
			state.errors = []
		},
		logoutFetching: state => {
			state.isLoading = true
		},
		logoutFailed: (state, action) => {
			state.isLoading = false
			state.errors = action.payload
		},
		logoutSuccess: state => {
			state.isLoading = false
			state.errors = []
			state.isAuth = false
		},
		checkTokenFetching: state => {
			state.isLoading = true
		},
		checkTokenFailed: (state, action) => {
			state.isLoading = false
			state.errors = action.payload
		},
		checkTokenSuccess: (state, action) => {
			state.isLoading = false
			state.errors = []
			state.isAuth = true
			state.currentUser = action.payload
		},
	},
})

export const {
	setErrors,
	setIsAuth,
	loginFetching,
	loginFailed,
	loginSuccess,
	registerFetching,
	registerFailed,
	registerSuccess,
	logoutFetching,
	logoutFailed,
	logoutSuccess,
	checkTokenFetching,
	checkTokenFailed,
	checkTokenSuccess,
} = authSlice.actions

export default authSlice.reducer
