import React, { useEffect } from 'react'
import { files as getFiles } from '../../../../store/asyncActionCreators/fileCreator'
import {
	useAppDispatch,
	useAppSelector,
} from '../../../helpers/hooks/storeHooks'
function UserFiles() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(getFiles())
	}, [])
	const { files, isLoading } = useAppSelector(state => state.fileReducer)
	return (
		<>
			<div className='flex flex-col w-full'>
				{isLoading && 'Загрузка'}
				{!!files.length &&
					files.map(file => {
						return (
							<div key={file.file_id} className='text-[1.2rem] text-black'>
								{file.file_name}
							</div>
						)
					})}
			</div>
		</>
	)
}

export default UserFiles
