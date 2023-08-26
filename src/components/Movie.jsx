import '../client/Forms.css'
import '../client/Movies.css'

import { useState, useEffect } from 'react'

const apiUrl = 'http://localhost:4000'

function Movie() {
	const initialMovieInput = {
		title: '',
		genre: '',
		runtimeMins: '',
		rating: '',
		comment: '',
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
		console.log('title', e.target.value)
	}

	function handleMovieGenrChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, genre: value })
		console.log('genre', e.target.value)
	}

	function handleMovieRuntimeChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, runtimeMins: value })
		console.log('runtime', e.target.value)
	}

	function handleMovieRatingChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, rating: value })
		console.log('rating', e.target.value)
	}

	function handleMovieCommentChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, comment: value })
		console.log('comment', e.target.value)
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
				setMovieInput(initialMovieInput)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	function editMovie(e, id) {
		e.preventDefault()

		const option = {
			methid: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		}
		// 	fetch(`${apiUrl}/movie/${id}`, option)
		// 		.then((res) => res.json())
		// 		.then((res) => {
		// 		// 	const updatedMovie =
		// 		// })
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
				{/* Title */}
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
				{/* Genre */}
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
				{/* RunTime */}
				<label>
					<input
						className="input"
						type="text"
						name="minutes"
						placeholder="Minutes"
						value={movieInput.runtimeMins}
						onChange={handleMovieRuntimeChange}
					/>
					<br />
				</label>
				{/* Rating */}
				<label>
					Rating
					<select
						name="rating"
						value={movieInput.rating}
						onChange={handleMovieRatingChange}
					>
						<option name="rating">1</option>
						<option name="rating">2</option>
						<option name="rating">3</option>
						<option name="rating">4</option>
						<option name="rating">5</option>
					</select>
				</label>
				{/* Comment */}
				<label>
					<input
						className="input"
						type="textarea"
						name="comment"
						placeholder="Comment"
						value={movieInput.comment}
						onChange={handleMovieCommentChange}
					/>
				</label>
				{/* Add Movie */}
				<input
					className="button"
					type="submit"
					name="Add"
					value={'Add Movie'}
					onClick={handleCreateMovie}
				/>
				{/* Rendering on screen */}
				<h2>Your List</h2>
				<div className="container">
					<ul>
						{movieList.map((movie) => (
							<li key={movie.id}>
								<h4 className="title">Title</h4>
								<p> {movie.title}</p>

								<h4 className="Genre">Genre</h4>
								<p> {movie.genre}</p>

								<h4 className="min">Runtime</h4>
								<p> {movie.runtimeMins}</p>

								<h4 className="rating">Rating</h4>
								<p>{movie.rating}</p>

								<h4 className="comment">Comment</h4>
								<p>{movie.comment}</p>

								{/* Buttons */}
								<button
									className="edit"
									onClick={(e) => editMovie(e, movie.id)}
								>
									Edit
								</button>
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
