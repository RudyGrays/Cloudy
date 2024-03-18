import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { checkToken } from '../../store/asyncActionCreators/authCreator'
import { setIsAuth } from '../../store/reducers/AuthSlice'
import Sidebar from '../UI/sidebar/Sidebar'
import { Footer, Header, HeaderNav, Main } from '../componentsStore'
import { useAppDispatch, useAppSelector } from '../helpers/hooks/storeHooks.ts'
function MainLayout() {
	const { isAuth, currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(setIsAuth(true))
		}
		if (!localStorage.getItem('check')) {
			localStorage.setItem('check', JSON.stringify('true'))
		}
		if (isAuth && localStorage.getItem('check')) {
			dispatch(checkToken())
		}
		const interval = setTimeout(() => {
			localStorage.removeItem('check')
		}, 4000)

		return () => {
			clearInterval(interval)
		}
	}, [])
	return (
		<>
			<div className='flex flex-col text-[1.2rem] w-full h-full'>
				<Header>
					<HeaderNav />
				</Header>
				<Sidebar />
				<Main>
					<Outlet />
				</Main>
				<Footer>
					<div className='flex w-full h-full p-2 items-center justify-center'>
						Footer
					</div>
				</Footer>
			</div>
		</>
	)
}

export default MainLayout
