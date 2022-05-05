const { check, validationResult } = require('express-validator');

exports.validateUsername = [
	check('username')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('username is required')
		.bail()
		.isLength({ min: 3 })
		.withMessage('username cannot be short from 3 characters')
		.bail(),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	}
]
