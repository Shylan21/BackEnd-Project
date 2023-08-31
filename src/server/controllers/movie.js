const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

// Get list of all movies
const getMovies = async (req, res) => {
	const movies = await prisma.movie.findMany({
		orderBy: {
			id: 'asc',
		},
	})
	return res.status(200).json({ movies: movies })
}

// Create new movie
const createMovie = async (req, res) => {
	const { title, genre, runtimeMins, rating, comment } = req.body

	if (!title || !genre || !runtimeMins || !rating || !comment) {
		return res.status(400).json({
			error: 'Movie already exists or cannot create movie. Try again.',
		})
	}
	// Create new movie if there's not already the same one existing
	try {
		const token = req.headers.authorization.split(' ')[1]
		const decodedToken = jwt.verify(token, secretKey)

		if (decodedToken) {
			const createdMovie = await prisma.movie.create({
				data: {
					title,
					genre,
					runtimeMins,
					rating,
					comment,
				},
			})
			res.status(200).json({ movie: createdMovie })
		}
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return console.log(res.json({ error: 'Cannot create movie.' }))
			}
		} else {
			return res.status(500).json({ error: e.message })
		}
	}
}

const editMovie = async (req, res) => {
	const { title, genre, runtimeMins, rating, comment } = req.body
	const movieId = Number(req.params.id)

	if (!title || !genre || !runtimeMins || !rating || !comment) {
		return res.status(400).json({
			error: 'Movie cannot be edited. Try again.',
		})
	}
	try {
		const findMovie = await prisma.movie.findUnique({
			where: {
				id: movieId,
			},
		})
		if (findMovie) {
			const editMovie = await prisma.movie.update({
				where: {
					id: movieId,
				},
				data: {
					title,
					genre,
					runtimeMins,
					rating,
					comment,
				},
				// include: {
				// 	movie: true,
				// }, 
				// To modify connected prisma schema models
			})
			return res.status(200).json({ movie: editMovie })
		}
	} catch (error) {
		console.error(error)
		return res
			.status(500)
			.json({ error: 'An error occurred while editing the movie.' })
	}
}

const deleteMovie = async (req, res) => {
	const movieId = Number(req.params.id)

	try {
		const deletedMovie = await prisma.movie.delete({
			where: {
				id: movieId,
			},
		})
		return res.status(200).json({ movie: deletedMovie })
	} catch (error) {
		console.error(error)
		return res
			.status(500)
			.json({ error: 'An error occurred while deleting the movie.' })
	}
}

module.exports = {
	getMovies,
	createMovie,
	deleteMovie,
	editMovie,
}
