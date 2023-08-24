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
	const { title, genre, runtimeMins } = req.body
	// const { rating, comment } = req.body
	
// Add in te if statement ||!rating ||!comment
	if (!title || !genre || !runtimeMins) {
		return res.status(400).json({
			error: 'Missing fields in request body',
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
					// rating,
					// comment,
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

module.exports = {
	getMovies,
	createMovie,
}
