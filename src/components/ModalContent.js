import '../client/style/Modal.css'
import '../client/style/Forms.css'

import { useState, useEffect } from 'react'
const apiUrl = 'http://localhost:4000'

export default function ModalContent({ open, onClose, movie }) {
	const [movieInput, setMovieInput] = useState(movie)
	useEffect(() => {
		console.log('movie input', movieInput)
	}, [])

	function handleSaveClick(e) {
		e.preventDefault()

		if (!movieInput) return

		const option = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(movieInput),
		}

		fetch(`${apiUrl}/movie/${movieInput.id}`, option)
			.then((res) => res.json())
			.then((updatedMovie) => {
				// console.log('movie', movie)
				// console.log('update Movie', updatedMovie)
				onClose()
			})
			.catch((error) => {
				console.error('Error editing movie:', error)
			})
	}

	let modalClasses = 'modal'
	if (open === movie.id) {
		modalClasses += ' open'

		function handleChange(evt) {
			const value = evt.target.value
			console.log('value', value)
			console.log('e', evt.target.name)
			setMovieInput({
				...movieInput,
				[evt.target.name]: value,
			})
		}

		return (
			<div className={modalClasses}>
				<div className="modal-content">
					{/* Title */}
					<input
						className="input"
						type="text"
						name="title"
						placeholder="Title"
						value={movieInput.title}
						onChange={handleChange}
					/>
					{/* Genre */}
					<input
						className="input"
						type="text"
						name="genre"
						placeholder="Genre"
						value={movieInput.genre}
						onChange={handleChange}
					/>
					{/* RunTime */}
					<input
						className="input"
						type="text"
						name="minutes"
						placeholder="Minutes"
						value={movieInput.runtimeMins}
						// Doesn't work
						onChange={handleChange}
					/>
					<br />
					{/* Rating */}
					<select
						className="rating"
						name="rating"
						value={movieInput.rating} // Doesn't work
						onChange={handleChange}
					>
						<option name="rating">1</option>
						<option name="rating">2</option>
						<option name="rating">3</option>
						<option name="rating">4</option>
						<option name="rating">5</option>
					</select>
					{/* Comment */}
					<textarea
						rows="4"
						cols="50"
						className="input textarea"
						name="comment"
						placeholder="Write a comment..."
						value={movieInput.comment}
						onChange={handleChange}
					/>
					{/* Buttons */}
					<button className="save-button" onClick={(e) => handleSaveClick(e)}>
						Save
					</button>
					<button className="close-button" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		)
	}
}
