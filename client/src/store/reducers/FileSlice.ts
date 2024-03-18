import { createSlice } from '@reduxjs/toolkit'
import MyFile from '../../http/Models/File'
import MyShared from '../../http/Models/Shared'

interface InitialState {
	isLoading: boolean
	errors: string[]
	files: MyFile[]
	shared: MyShared[]
}
const initialState: InitialState = {
	isLoading: false,
	errors: [],
	files: [],
	shared: [],
}

export const fileSlice = createSlice({
	name: 'fileSlice',
	initialState,
	reducers: {
		uploadFetching: (state, action) => {
			state.isLoading = true
		},
		uploadError: state => {
			state.isLoading = false
		},
		uploadSuccess: state => {
			state.isLoading = false
		},
		deleteFetching: (state, action) => {
			state.isLoading = true
		},
		deleteError: state => {
			state.isLoading = false
		},
		deleteSuccess: state => {
			state.isLoading = false
		},
		updateFetching: (state, action) => {
			state.isLoading = true
		},
		updateError: state => {
			state.isLoading = false
		},
		updateSuccess: state => {
			state.isLoading = false
		},
		downloadFetching: (state, action) => {
			state.isLoading = true
		},
		downloadError: state => {
			state.isLoading = false
		},
		downloadSuccess: state => {
			state.isLoading = false
		},
		addAccessFetching: (state, action) => {
			state.isLoading = true
		},
		addAccessError: state => {
			state.isLoading = false
		},
		addAccessSuccess: state => {
			state.isLoading = false
		},
		deleteAccessFetching: (state, action) => {
			state.isLoading = true
		},
		deleteAccessError: state => {
			state.isLoading = false
		},
		deleteAccessSuccess: state => {
			state.isLoading = false
		},
		filesFetching: state => {
			state.isLoading = true
		},
		filesError: (state, action) => {
			state.isLoading = false
			state.errors = action.payload
		},
		filesSuccess: (state, action) => {
			state.isLoading = false
			state.files = action.payload
		},
		sharedFetching: state => {
			state.isLoading = true
		},
		sharedError: (state, action) => {
			state.isLoading = false
			state.errors = action.payload
		},
		sharedSuccess: (state, action) => {
			state.isLoading = false
			state.shared = action.payload
		},
	},
})

export const {
	uploadFetching,
	uploadError,
	uploadSuccess,
	deleteFetching,
	deleteError,
	deleteSuccess,
	updateFetching,
	updateError,
	updateSuccess,
	downloadFetching,
	downloadError,
	downloadSuccess,
	addAccessFetching,
	addAccessError,
	addAccessSuccess,
	deleteAccessFetching,
	deleteAccessError,
	deleteAccessSuccess,
	filesFetching,
	filesError,
	filesSuccess,
	sharedFetching,
	sharedError,
	sharedSuccess,
} = fileSlice.actions
export default fileSlice.reducer
