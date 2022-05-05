const express = require('express')
const session = require('cookie-session')

const setupPassport = require('./lib/passport')

require('./database-connection')

const app = express()
const passport = setupPassport()

const { COOKIE_SEESION_KEY_1, COOKIE_SEESION_KEY_2 } = require('./config')

app.use(
	session({
		name: 'session',
		keys: [COOKIE_SEESION_KEY_1, COOKIE_SEESION_KEY_2],
		resave: false,
		saveUninitialized: true,
		sameSite: 'lax',
		maxAge: null,
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

app.use(async (req, res, next) => {
	req.sessionOptions.maxAge =
		req.session.rememberme || req.sessionOptions.maxAge
	res.locals.user = req.user
	return next()
})

// Routes
require('./routes/auth')(app)

module.exports = app
