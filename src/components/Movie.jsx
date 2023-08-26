import '../client/Forms.css'
import '../client/Movies.css'

import { useState, useEffect } from 'react'

const apiUrl = 'http://localhost:4000'

function Movie() {
	const initialMovieInput = {
		title: '',
		genre: '',
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

	function handleMovieGenrChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, genre: value })
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
				setMovieList([...movieList, response.movies])
			})
			.catch((err) => {
				console.error(err)
			})
	}

	function deleteMovie(e, id) {
		e.preventDefault()
		const options = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		}

		fetch(`${apiUrl}/movie/${id}`, options)
			.then((res) => res.json())
			.then((response) => {
				const updatedMovieList = movieList.filter((movie) => movie.id !== id)
				setMovieList(updatedMovieList)
			})
			.catch((err) => console.error(err))
	}

	return (
		<>
			<div className="Movie">
				{/* {<a className="logout-link" href="">Logout</a>} */}
				<h1>Add new movies</h1>
				<label>
					<input
						className="input"
						type="text"
						name="title"
						placeholder="Title"
						value={movieInput.title}
						onChange={handleMovieTitleChange}
					/>
				</label>
				<label>
					<input
						className="input"
						type="text"
						name="genre"
						placeholder="Genre"
						value={movieInput.genre}
						onChange={handleMovieGenrChange}
					/>
				</label>
				<label>
					<input
						className="input"
						type="text"
						name="minutes"
						placeholder="Minutes"
						value={movieInput.runtimeMins}
						onChange={handleMovieRuntimeChange}
					/>
				</label>
				<input
					className="button"
					type="submit"
					name="sAdd"
					value={'Add Movie'}
					onClick={handleCreateMovie}
				/>

				<h2>Your List</h2>
				<div className="container">
					<ul>
						{movieList.map((movie) => (
							<li key={movie.id}>
								<h4 className="title">Title</h4>
								<p> {movie.title}</p>
								{console.log('title', movie.title)}
								<h4 className="Genre">Genre</h4>
								<p> {movie.genre}</p>
								<h4 className="min">Runtime</h4>
								<p> {movie.runtimeMins}</p>
								{/* <h4 className="rating">Rating</h4>
							<p>{movie.rating}</p>

							<h4 className="comment">Comment</h4>
							<p>{movie.comment}</p> */}
								<button className="edit">Edit</button>
								<button
									className="delete"
									onClick={(e) => deleteMovie(e, movie.id)}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Movie
