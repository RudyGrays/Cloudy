import { createBrowserRouter } from 'react-router-dom'
import {
	Auth,
	FilesLayout,
	MainLayout,
	SharedFiles,
	UserFiles,
} from '../components/componentsStore'
export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: 'register',
				element: <Auth type='register' />,
			},
			{
				path: 'login',
				element: <Auth type='login' />,
			},
			{
				path: 'files',
				element: <FilesLayout />,
				children: [
					{
						path: 'disk',
						element: <UserFiles />,
					},
					{
						path: 'shared',
						element: <SharedFiles />,
					},
				],
			},
		],
	},
])
