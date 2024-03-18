import React, { createContext, useState } from 'react'
export const SidebarContext = createContext({})

export const SidebarProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const open = () => {
		setIsSidebarOpen(true)
	}
	const close = () => setIsSidebarOpen(false)

	return (
		<SidebarContext.Provider value={{ open, close, isSidebarOpen }}>
			{children}
		</SidebarContext.Provider>
	)
}
