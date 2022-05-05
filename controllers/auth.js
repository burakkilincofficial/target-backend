const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.register = async (req, res) => {
	try {
		const existingUsername = await User.findOne({ username: req.body.username })
		if (existingUsername) {
			return res.status(400).send({ msg: 'username must be unique' })
		}

		const user = new User({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		})

		await user.save()
		res.status(201).send({ msg: 'user was created successfully' })
	} catch {
		res.status(500).send({ msg: 'some error occured while user creating' })
	}
}

exports.login = async (req, res, next) => {
	try {
		const token = jwt.sign(
			{
				userId: req.user.id
			},
			config.JWT_SECRET,
			{ expiresIn: '24h' }
		)
		return res.json({ jwt: token })
	} catch (err) {
		return next(err)
	}
}

exports.verifyUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId)
		if (!user || user.verificationToken !== req.params.token) {
			res.status(401).send({ msg: 'you do not have authority for this operation' })
		} else {
			user.verified = true
			await user.save()
			res.status(200).send({ msg: 'user was verified successfully' })
		}
	} catch {

	}
}

exports.logout = (req, res, next) => {
	req.logout()
	res.status(200).send({ msg: 'log out' })
}

exports.whoami = (req, res, next) => {
	return res.json({ username: req.user.username })
}
