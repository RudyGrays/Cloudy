import React from 'react'
import { Container } from '../../componentsStore'

function Header({ children }) {
	return (
		<header
			style={{ backgroundColor: '#2c2c2c' }}
			className='w-full h-[70px] text-[1.2rem] text-white  text-xs'
		>
			<Container>{children}</Container>
		</header>
	)
}

export default Header
