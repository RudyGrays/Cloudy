import React from 'react'

function Button({ children = '', ...props }) {
	return (
		<button
			{...props}
			className='px-3 py-3 bg-blue-500 rounded-xl text-white w-full'
		>
			{children}
		</button>
	)
}

export default Button
