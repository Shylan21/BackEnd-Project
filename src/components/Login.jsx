import '../client/App.css'
import '../client/Forms.css'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const apiUrl = 'http://localhost:4000'

function Login() {
	const navigate = useNavigate()

	const initialUserInput = {
		email: '',
		password: '',
		token: '',
	}
	const [loginUser, setLoginUser] = useState(initialUserInput)

	// Login Functions
	function handleLoginChange(e) {
		e.preventDefault()
		const inputName = e.target.name
		const inputValue = e.target.value

		setLoginUser({ ...loginUser, [inputName]: inputValue })
		console.log('Login value', inputName, inputValue)
	}

	function handleLogin(e) {
		e.preventDefault()
		fetch(`${apiUrl}/user/login`, {
			method: 'POST',
			body: JSON.stringify(loginUser),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				setLoginUser({ ...loginUser, token: data.token })
				localStorage.setItem('token', data.token)
				navigate('/movie')
			})
			.catch((err) => {
				console.error(err)
			})
	}
	return (
		<>
			<form>
				<h1>Login</h1>
				<label>
					<input
						className="email"
						type="text"
						name="email"
						placeholder="Email"
						autoComplete="off"
						value={loginUser.username}
						onChange={handleLoginChange}
					/>
				</label>
				<label>
					<input
						className="password"
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="off"
						value={loginUser.username}
						onChange={handleLoginChange}
					/>
				</label>
				<input
					className="button"
					type="submit"
					name="submit"
					value={'Login'}
					onClick={handleLogin}
				/>
			</form>
			<p>
				Don't have an account yet?
				<br />
				Click here to
				<Link className="link" to={'/register'}>
					{''} Register
				</Link>
			</p>
		</>
	)
}

export default Login
