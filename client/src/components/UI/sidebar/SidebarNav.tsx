import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../helpers/hooks/storeHooks'
import Folder from '../../helpers/svgComponents/folder/Folder'
import HomeIcon from '../../helpers/svgComponents/home/HomeIcon'
import LoginIcon from '../../helpers/svgComponents/login/LoginIcon'
import RegisterIcon from '../../helpers/svgComponents/register/RegisterIcon'
import Shared from '../../helpers/svgComponents/shared/Shared'
function SidebarNav() {
	const { isAuth } = useAppSelector(state => state.authReducer)
	const navList = isAuth
		? [
				{
					id: 1,
					href: '/',
					icon: <HomeIcon />,
					text: 'Главная',
				},
				{
					id: 2,
					href: 'files/disk',
					icon: <Folder />,
					text: 'Мои файлы',
				},
				{
					id: 3,
					href: 'files/shared',
					icon: <Shared />,
					text: 'Доступные файлы',
				},
		  ]
		: [
				{
					id: 1,
					href: '/',
					icon: <HomeIcon />,
					text: 'Главная',
				},
				{
					id: 4,
					href: '/register',
					icon: <RegisterIcon />,
					text: 'Зарегистрироваться',
				},
				{
					id: 5,
					href: '/login',
					icon: <LoginIcon />,
					text: 'Войти в аккаунт',
				},
		  ]
	return (
		<ul className='flex flex-col gap-[30px] w-full list-non'>
			{navList.map(item => (
				<li key={item.id}>
					<NavLink
						to={item.href}
						className={`flex gap-[25px] transition-all items-center text-[1.2rem]  hover:last:ml-[10px] ${({
							isActive,
						}) => (isActive ? 'text-blue-600 scale-125' : '')} text-white`}
					>
						{item.text}
						{item.icon}
					</NavLink>
				</li>
			))}
		</ul>
	)
}

export default SidebarNav
