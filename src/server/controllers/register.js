const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const bcrypt = require('bcrypt')


const register = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({
			error: 'Missing field.',
		})
	}
	try {
		const hashedPassw = await bcrypt.hash(password, 12)

		const registerUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassw,
			},
		})
		res.status(200).json({ user: registerUser })
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return res.status(409).json({
					error: 'Already exists, try with another email or password',
				})
			}
		} else {
			return res.status(500).json({ error: e.message })
		}
	}
}


module.exports = {
	register
}
