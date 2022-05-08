const nodemailer = require("nodemailer")
const config = require('../config')

exports.transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.AUTH_EMAIL,
		pass: config.AUTH_PASS
	}
})
