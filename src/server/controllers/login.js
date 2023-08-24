const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secretKey = process.env.JWT_SECRET

const login = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({
			error: 'Missing fields.',
		})
	}

	try {
		const foundUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
			select: {
				password: true,
			},
		})
		if (foundUser) {
			const matchPassw = await bcrypt.compare(password, foundUser.password)

			if (matchPassw) {
				const token = jwt.sign({ email: email }, secretKey)
				// res.header('Access-Control-Allow-Origin', '*')
				res.send({ token })
			} else res.status(401).send('Invalid email or password')
		}
	} catch (e) {
		return res.status(500).json({ error: e })
	}
}

module.exports = {
	login,
}
