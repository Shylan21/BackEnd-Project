import '../client/App.css'
import '../client/Forms.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const apiUrl = 'http://localhost:4000'

// Starting point
function Register() {
	const navigate = useNavigate()

	const initialUserInput = {
		email: '',
		password: '',
		token: '',
	}

	const [registerUser, setRegisterUser] = useState(initialUserInput)
	// const [loginUser, setLoginUser] = useState(initialUserInput)

	// Registration Functions
	function handleRegisterChange(e) {
		e.preventDefault()
		const inputName = e.target.name
		const inputValue = e.target.value

		setRegisterUser({ ...registerUser, [inputName]: inputValue })
		console.log('Register value', inputName, inputValue)
	}

	function handleRegister(e) {
		e.preventDefault()

		fetch(`${apiUrl}/user/register`, {
			method: 'POST',
			body: JSON.stringify(registerUser),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => res.json())
			.then((data) => {
				setRegisterUser({ ...registerUser, token: data.token })
				navigate('/login')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	// Login Functions
	// function handleLoginChange(e) {
	// 	e.preventDefault()
	// 	const inputName = e.target.name
	// 	const inputValue = e.target.value

	// 	setLoginUser({ ...loginUser, [inputName]: inputValue })
	// 	console.log('Login value', inputName, inputValue)
	// }

	// function handleLogin(e) {
	// 	e.preventDefault()
	// 	fetch(`${apiUrl}/user/login`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(loginUser),
	// 		headers: { 'Content-Type': 'application/json' },
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setLoginUser({ ...loginUser, token: data.token })
	// 			localStorage.setItem('token', data.token)
	// 			navigate('/movie')
	// 		})
	// 		.catch((err) => {
	// 			console.error(err)
	// 		})
	// }

	return (
		<>
			<h1>Welcome!</h1>
			<form>
				<h3>New user? Register now!</h3>
				<label>
					<input
						className="email"
						type="text"
						name="email"
						placeholder="Email"
						value={registerUser.email}
						onChange={handleRegisterChange}
					/>
				</label>
				<label>
					<input
						className="password"
						type="password"
						name="password"
						placeholder="Password"
						value={registerUser.password}
						onChange={handleRegisterChange}
					/>
				</label>
				<input
					className="button"
					type="submit"
					name="submit"
					value={'Submit'}
					onClick={handleRegister}
				/>
			</form>
			<p>
				Already registered?
				<br />
				Click here to 
				<a className="link" href="../components/Register"> Login</a>
			</p>
		</>
	)
}

export default Register
