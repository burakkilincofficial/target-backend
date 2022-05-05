const { check, validationResult } = require('express-validator');

exports.validatePassword = [
	check('password')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Password is required')
		.bail()
		.isLength({ min: 8 })
		.withMessage('Password cannot be short from 8 characters')
		.bail()
		.custom((value, { req, loc, path }) => {
			if (value !== req.body.confirmPassword) {
				throw Error('Password and Confirm Password do not match')
			} else {
				return value
			}
		}),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	}
]
