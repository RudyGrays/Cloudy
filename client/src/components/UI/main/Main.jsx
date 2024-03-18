import React from 'react'
import { Container } from '../../componentsStore'

function Main({ children }) {
	return (
		<div className='flex w-full h-full flex-grow'>
			<Container>{children}</Container>
		</div>
	)
}

export default Main
