

export default function ModalContent({ onClose }) {
	return (
		<div className="modal">
			{/* <div className="edit-form">
				className="input" type="text" name="title" placeholder="Title" value=
				{movieInput.title}
				onChange={handleMovieTitleChange}
			</div> */}
			{/* editedMovie && editedMovie.id === movie.id ? //{' '} */}
      <button  className="button"
      // onClick={(e) => handleSaveClick(e)}
      >
				Save 
			</button>
			<button className="button" onClick={onClose}>Close</button>
		</div>
	)
}
