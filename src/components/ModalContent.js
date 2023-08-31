import '../client/style/App.css'
import '../client/style/Modal.css'
import '../client/style/Forms.css'

export default function ModalContent({ onClose }) {
	return (
		<div className="modal">
			<div className="modal-content">
				{/* editedMovie && editedMovie.id === movie.id ? //{' '} */}
			
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
