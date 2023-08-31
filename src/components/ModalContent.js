import '../client/style/Modal.css'
import '../client/style/Forms.css'

export default function ModalContent({ open, onClose }) {
	let modalClasses = 'modal'
	if (open) {
		modalClasses += ' open'
	}
	return (
		<div className={modalClasses}>
			<div className="modal-content">
				{/* Title */}
				<input className="input" type="text" name="title" placeholder="Title" />
				{/* Genre */}
				<input className="input" type="text" name="genre" placeholder="Genre" />
				{/* RunTime */}
				<input
					className="input"
					type="text"
					name="minutes"
					placeholder="Minutes"
				/>
				{/* Rating */}
				<select className="rating" name="rating">
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
				/>
				{/* Buttons */}
				<button
					className="save-button"
					// onClick={(e) => handleSaveClick(e)}
				>
					Save
				</button>
				<button className="close-button" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	)
}
