import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { SidebarProvider } from './components/UI/sidebar/SidebarContext'
import './index.css'
import { router } from './router/router.jsx'
import { store } from './store'
ReactDOM.createRoot(document.getElementById('root')).render(
	<SidebarProvider>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</SidebarProvider>
)
