const router = require('express').Router()
const authContoller = require('../controllers/auth')
const passport = require('passport');

const { validateUsername } = require('../middlewares/usernameValidator')
const { validatePassword } = require('../middlewares/passwordValidator')
const { validateEmail } = require('../middlewares/emailValidator')

module.exports = app => {
	router.post('/register', validateUsername, validatePassword, validateEmail, authContoller.register)
	router.post('/login', passport.authenticate('local', { session: false }), authContoller.login)
	router.get('/logout', authContoller.logout)
	router.get('/verify/:userId/:token', authContoller.verifyUser)
	router.get('/whoami', passport.authenticate('jwt', { session: false }), authContoller.whoami)

	app.use('/v1/auth', router)
}
