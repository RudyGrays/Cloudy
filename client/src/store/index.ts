import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthSlice'
import fileReducer from './reducers/FileSlice'
export const store = configureStore({
	reducer: {
		authReducer,
		fileReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
