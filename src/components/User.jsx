import '../client/App.css'
import '../client/Forms.css'

import { useState, useEffect } from 'react'

const apiUrl = 'http://localhost:4000'

// Starting point
function RegisterAndLogin() {
	const initialUserInput = {
		email: '',
		password: '',
		token: '',
	}

	const [registerUser, setRegisterUser] = useState(initialUserInput)
	const [loginUser, setLoginUser] = useState(initialUserInput)

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
			})
			.catch((err) => {
				console.log(err)
			})
	}

	// Login Functions
	function handleLoginChange(e) {
		e.preventDefault()
		const inputName = e.target.name
		const inputValue = e.target.value

		setLoginUser({ ...loginUser, [inputName]: inputValue })
		console.log('Login value', inputName, inputValue)
	}
	return (
		<>
			<form>
				<h1>Register</h1>
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
				<h1>Login</h1>
				<label>
					<input
						className="email"
						type="text"
						name="email"
						placeholder="Email"
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
						value={loginUser.password}
						onChange={handleLoginChange}
					/>
				</label>
				<input
					className="button"
					type="submit"
					name="submit"
					value={'Submit'}
					// onClick={handleLogin, loadNewPage}
				/>
			</form>
		</>
	)
}

export default RegisterAndLogin
