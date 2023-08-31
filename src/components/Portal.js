import '../client/Forms.css'
import '../client/Movie.css'

import { createPortal } from 'react-dom'
import ModalContent from './ModalContent.js'
import { useState } from 'react'

export default function EditPortal() {
	const [showModal, setShowModal] = useState(false)
	return (
		<>
			<button className="button" onClick={() => setShowModal(true)}>
				Edit
			</button>
			{showModal &&
				createPortal(
					<ModalContent onClose={() => setShowModal(false)} />,
					document.body
				)}
		</>
	)
}
