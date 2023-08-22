import '../App.css'

function Register() {
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
						autoComplete="off"
						// value={registerUser.email}
						// onChange={handleRegisterChange}
					/>
				</label>
				<label>
					<input
						className="password"
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="off"
						// value={registerUser.email}
						// onChange={handleRegisterChange}
					/>
				</label>
				<input
					className="button"
					type="submit"
					name="submit"
					value={'Submit'}
					// onClick={handleRegister}
				/>
			</form>
		</>
	)
}

export default Register
