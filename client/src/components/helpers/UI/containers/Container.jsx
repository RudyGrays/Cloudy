import React from 'react'

function Container({ children }) {
	return (
		<div style={{ margin: '0 auto' }} className='max-w-[1700px] h-full w-full'>
			{children}
		</div>
	)
}

export default Container
