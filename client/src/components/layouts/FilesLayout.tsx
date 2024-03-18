import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../helpers/hooks/storeHooks'
function FilesLayout() {
	const { currentUser, isAuth, errors } = useAppSelector(
		state => state.authReducer
	)
	const navigateBack = useNavigate()
	useEffect(() => {
		if (!isAuth) return navigateBack(-1)
	}, [])

	return (
		<div className='flex h-full w-full'>
			<Outlet />
		</div>
	)
}

export default FilesLayout
