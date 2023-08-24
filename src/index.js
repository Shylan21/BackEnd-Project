import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './client/App'
import RegisterAndLogin from './components/User'
import Movie from './components/Movie'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/register',
		element: <RegisterAndLogin />,
	},
	{
		path: '/login',
		element: <RegisterAndLogin />,
	},
	{
		path: '/movie',
		element: <Movie />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)
