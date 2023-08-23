import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './client/App'
import RegisterAndLogin from './components/User'
import Movie from './components/Movie'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
			<RegisterAndLogin />
			<Movie/>
		</BrowserRouter>
	</React.StrictMode>
)
