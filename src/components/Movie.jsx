
import '../client/Forms.css'
import '../client/Movies.css'

import { useState, useEffect } from 'react'

const apiUrl = 'http://localhost:4000'

function Movie() {
	const initialMovieInput = {
		title: '',
		description: '',
		runtimeMins: '',
	}
	const [movieList, setMovieList] = useState([])
	const [movieInput, setMovieInput] = useState(initialMovieInput)

	useEffect(() => {
		const movieList = getMovies()
	}, [])

	function getMovies() {
		fetch(`${apiUrl}/movie`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setMovieList(data.movies)
			})
	}

	function handleMovieTitleChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, title: value })
	}

	function handleMovieDescrChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, description: value })
	}

	function handleMovieRuntimeChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, runtimeMins: value })
	}

	function handleCreateMovie(e) {
		e.preventDefault()

		const tokenItem = localStorage.getItem('token')

		fetch(`${apiUrl}/movie`, {
			method: 'POST',
			body: JSON.stringify({
				...movieInput,
				runtimeMins: Number(movieInput.runtimeMins),
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenItem}`,
			},
		})
			.then((response) => response.json())
			.then((response) => {
				setMovieList([...movieList, response.movie])
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<div className="Movie">
			{/* {<a href="">Logout</a>} */}
			<h1>Create movie</h1>
			<label>
				<input
					className='input'
					type="text"
					name="title"
					placeholder="Title"
					value={movieInput.title}
					onChange={handleMovieTitleChange}
				/>
			</label>
			<label>
				<input
					className='input'
					type="text"
					name="description"
					placeholder="Genre"
					value={movieInput.description}
					onChange={handleMovieDescrChange}
				/>
			</label>
			<label>
				<input
					className='input'
					type="text"
					name="minutes"
					placeholder="Minutes"
					value={movieInput.runtimeMins}
					onChange={handleMovieRuntimeChange}
				/>
			</label>
			<input
				className='button'
				type="submit"
				name="submit"
				value={'Submit'}
				onClick={handleCreateMovie}
			/>

			<h2>Movie List</h2>
			<ul>
				{movieList.map((movie) => (
					<li key={movie.id}>
						<h4>{movie.title}</h4> 
						<p>Genre: {movie.description}</p>
						<p>Runtime: {movie.runtimeMins}</p>
					</li>
				))}
			</ul>
		
		</div>
	)
}

export default Movie
