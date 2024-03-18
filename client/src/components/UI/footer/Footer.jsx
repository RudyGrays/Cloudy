import React from 'react'
import { Container } from '../../componentsStore'

function Footer({ children }) {
	return (
		<div
			style={{ backgroundColor: '#2c2c2c' }}
			className='flex w-full h-[70px] items-center text-white'
		>
			<Container>{children}</Container>
		</div>
	)
}

export default Footer
