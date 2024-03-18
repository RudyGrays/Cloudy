import { AppDispatch } from '..'
import { FileService } from '../../services/FileService'
import { fileSlice } from '../reducers/FileSlice'
export const files = () => async (dispatch: AppDispatch) => {
	dispatch(fileSlice.actions.filesFetching())
	const response = await FileService.files()

	if (response.data.success != true) {
		return dispatch(fileSlice.actions.filesError(response.data.message))
	}
	dispatch(fileSlice.actions.filesSuccess(response.data.message))
}

export const shared = () => async (dispatch: AppDispatch) => {
	dispatch(fileSlice.actions.sharedFetching())
	const response = await FileService.shared()

	if (response.data.success != true) {
		return dispatch(fileSlice.actions.sharedError(response.data.message))
	}
	dispatch(fileSlice.actions.sharedSuccess(response.data.message))
}
