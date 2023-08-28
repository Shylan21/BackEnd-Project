import '../client/Forms.css'
import '../client/Movie.css'

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

	// const [editingMovieId, setEditingMovieId] = useState(null)
	// const [editedTitle, setEditedTitle] = useState('')
	// const [editedGenre, setEditedGenre] = useState('')
	// const [editedRuntime, setEditedRuntime] = useState('')
	// const [editedRating, setEditedRating] = useState('')
	// const [editedComment, setEditedComment] = useState('')

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
		setMovieInput({ ...movieInput, rating: Number(value) })
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
		console.log('list', movieList)
		const tokenItem = localStorage.getItem('token')
		console.log('input', movieInput)

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
				console.log('list', movieList)
				setMovieInput(initialMovieInput)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	function editMovie(e, id, updatedMovie) {
		e.preventDefault()

		const option = {
			methid: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedMovie),
		}

		fetch(`${apiUrl}/movie/${id}`, option)
			.then((res) => res.json())
			.then((editedMovie) => {
				const updatedMovie = movieList.map((movie) =>
					movie.id === id ? editedMovie : movie
				)
				setMovieList(updatedMovie)
			})
			.catch((error) => {
				console.error('Error editing movie:', error)
			})
	}

	// const saveEditedMovie = (e, id) => {
	// 	e.preventDefault()

	// 	const updatedMovieData = {
	// 		title: editedTitle,
	// 		genre: editedGenre,
	// 		runtimeMins: editedRuntime,
	// 		rating: editedRating,
	// 		comment: editedComment,
	// 	}

	// 	editMovie(e, id, updatedMovieData)
	// 	setEditingMovieId(null) // Reset editing state
	// }

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
					<b>Rating</b>
					<select
						className="rating"
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
				<br />
				{/* Comment */}
				<label>
					<textarea
						rows="4"
						cols="50"
						className="input textarea"
						name="comment"
						placeholder="Write a comment..."
						value={movieInput.comment}
						onChange={handleMovieCommentChange}
					/>
				</label>
				{/* Add Movie */}
				<input
					className="add"
					type="submit"
					name="Add"
					value={'Add Movie'}
					onClick={handleCreateMovie}
				/>
				{/* Rendering on screen */}
				<h2>Your List</h2>
				<div className="list">
					<div className="categories">
						<h4 className="title">Title</h4>
						<h4 className="genre">Genre</h4>
						<h4 className="min">Runtime</h4>
						<h4 className="rating-list">Rating</h4>
						<h4 className="comment">Comment</h4>
					</div>
				
					{movieList.map((movie) => (
						<div className="container" key={movie.id}>
							<p className="movieT"> {movie.title}</p>
							<p className="movieG"> {movie.genre}</p>
							<p className="movieM"> {movie.runtimeMins}</p>
							<p className="movieR">{movie.rating}</p>
							<p className="movieC">{movie.comment}</p>

							{/* Buttons */}

							<button className="edit" onClick={(e) => editMovie(e, movie.id)}>
								Edit
							</button>

							<button
								className="delete"
								onClick={(e) => deleteMovie(e, movie.id)}
							>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Movie
