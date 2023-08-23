import './App.css'

import { Routes, Route } from 'react-router-dom'
import RegisterAndLogin from '../components/User'
import Movie from '../components/Movie'
// import Login from '.components/Login'

function App() {
	return (
		<>
			{/* <RegisterAndLogin /> */}
			<Routes>
				<Route path="register" element={<RegisterAndLogin />} />
				<Route path="movie" element={<Movie />} />
			</Routes>
		</>
	)
}

export default App
