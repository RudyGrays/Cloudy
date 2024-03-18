import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import SidebarNav from './SidebarNav'
import { useSidebar } from './useSidebar'
function Sidebar() {
	const element = document.getElementById('sidebar')
	const { isSidebarOpen, close } = useSidebar()
	const closeHandler = e => {
		if (e.target.classList.contains('burger')) return
		close()
	}
	useEffect(() => {
		window.addEventListener('click', e => closeHandler(e))
		return () => window.removeEventListener('click', e => closeHandler(e))
	}, [])
	return createPortal(
		<aside
			onClick={e => {
				e.stopPropagation()
				const element = e.target
				if (
					element.classList.contains('aside') &&
					!element.classList.contains('aside__content')
				) {
					close()
				}
			}}
			className={`aside absolute h-full w-[300px] flex flex-col items-center justify-center transition-all translate-x-[-100%] bg-[#4f4f4f] z-10 ${
				isSidebarOpen && 'translate-x-[0]'
			}`}
		>
			<div className='aside__content '>
				<SidebarNav />
			</div>
		</aside>,
		element
	)
}

export default Sidebar
