import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/storeHooks'

function User({ ...props }) {
	const [info, setInfo] = useState(false)
	const { currentUser } = useAppSelector(state => state.authReducer)
	const [currentUserArray, setCurrentUserArray] = useState([])
	useEffect(() => {
		setCurrentUserArray(
			Object.keys(currentUser).map(item => {
				return { type: item, value: currentUser[item] }
			})
		)
	}, [])

	return (
		<div className='relative'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-8 h-8 cursor-pointer relative'
				onClick={() => setInfo(prev => !prev)}
				{...props}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
				/>
			</svg>
			{info && (
				<div
					onClick={() => setInfo(prev => !prev)}
					className='absolute bottom-0 translate-y-[100%] right-0 w-max h-min flex flex-col gap-4 p-4 bg-white rounded-xl'
				>
					{currentUserArray.map(item => (
						<div key={item.type} className='flex text-black text-[1.2rem]'>
							{item.type + ': ' + item.value}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default User
