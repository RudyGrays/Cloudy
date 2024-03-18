import React from 'react'
import { Navigate } from 'react-router-dom'
import { Login, Register } from '../../componentsStore.js'
import { useAppSelector } from '../../helpers/hooks/storeHooks.ts'
function Auth({ type = 'login' }) {
	const { isAuth } = useAppSelector(state => state.authReducer)
	return (
		<>
			{isAuth && <Navigate to={'/files'} />}
			<div className='flex h-full items-center justify-center flex-col'>
				{type == 'register' ? (
					<h2 className='text-blue-500 text-[2rem]'>Регистрация</h2>
				) : (
					<h2 className='text-blue-500 text-[2rem]'>Вход</h2>
				)}
				{type == 'register' ? <Register /> : <Login />}
			</div>
		</>
	)
}

export default Auth
