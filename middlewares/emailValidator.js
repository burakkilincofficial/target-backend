const { check, validationResult } = require('express-validator');

exports.validateEmail = [
	check('email')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('mail is required')
		.bail()
		.normalizeEmail()
		.isEmail()
		.withMessage('enter a correct mail address')
		.bail(),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	}
]
