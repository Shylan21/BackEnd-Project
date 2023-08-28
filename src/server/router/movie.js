const express = require('express')
const {
	getMovies,
	createMovie,
	editMovie,
	deleteMovie,
} = require('../controllers/movie')

const router = express.Router()

router.get('', getMovies)
router.post('', createMovie)
router.put('', editMovie)
router.delete('/:id', deleteMovie)


module.exports = router
