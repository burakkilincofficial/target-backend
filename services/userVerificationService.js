const { transporter } = require('./emailService')
const config = require('../config')

exports.sendUserVerificationEmail = (user) => {
	const verificationLink = `${config.BASE_URL}/v1/auth/verify/${user._id}/${user.verificationToken}`

	transporter.sendMail({
		from: config.AUTH_EMAIL,
		to: user.email,
		subject: 'User Verification',
		html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + verificationLink + ">Click here to verify</a>"
	})
}
