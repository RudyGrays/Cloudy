import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { logout } from '../../../store/asyncActionCreators/authCreator'
import { setErrors } from '../../../store/reducers/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/storeHooks'
import Burger from '../../helpers/svgComponents/burger/Burger'
import User from '../../helpers/svgComponents/user/User'
import { useSidebar } from '../sidebar/useSidebar'
function HeaderNav() {
	const { pathname } = useLocation()
	const { isAuth } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()
	const { open, close, isSidebarOpen } = useSidebar()
	const resetErrors = () => {
		dispatch(setErrors([]))
	}
	return (
		<div className='flex text-[1.4rem] w-full h-full items-center justify-between gap-3 px-2'>
			<div className='flex gap-3 items-center flex-grow'>
				<NavLink to={'/'} className='flex items-center gap-3'>
					<div className='w-9 h-9 rounded-[50%] bg-white' />
					<div>Cloudy</div>
				</NavLink>
			</div>

			<div className='flex gap-5 items-center h-full'>
				{isAuth && (
					<NavLink onClick={() => dispatch(logout())} to='/' className=''>
						Выйти
					</NavLink>
				)}
				{!isAuth && pathname != '/register' && (
					<NavLink onClick={resetErrors} to={'/register'}>
						Зарегистрироваться
					</NavLink>
				)}
				{!isAuth && pathname != '/login' && (
					<NavLink onClick={resetErrors} to={'/login'}>
						Войти
					</NavLink>
				)}
				{isAuth && <User />}
				<Burger onClick={() => (isSidebarOpen ? close() : open())} />
			</div>
		</div>
	)
}

export default HeaderNav
