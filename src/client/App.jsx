import './App.css'

import { Routes, Route, NavLink } from 'react-router-dom'
import RegisterAndLogin from '../components/User'
import Movie from '../components/Movie'
// import Login from '.components/Login'

function App() {
	return (
		<>
			{/* <RegisterAndLogin /> */}
			<Routes>
				<Route path="register" element={<RegisterAndLogin />} />
				<Route path="login" element={<RegisterAndLogin />} />
			
			</Routes>
		</>
	)
}

export default App
