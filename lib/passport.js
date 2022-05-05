const User = require('../models/user')
const { JWT_SECRET } = require('../config')

const passport = require('passport')
const passportJWT = require('passport-jwt')
const res = require('express/lib/response')
const LocalStrategy = require('passport-local').Strategy

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				try {
					const user = await User.findOne({ username: req.body.username })
					if (!user) {
						return done(null, false)
					}
					if (user && !user.verified) {
						return done(null, false)
					}
					const isValid = await user.comparePassword(req.body.password)
					if (!isValid) {
						return done(null, false)
					}
					return done(null, user)
				} catch (err) {
					return done(err)
				}
			}
		)
	)

	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey: JWT_SECRET,
			},
			async (jwtPayload, done) => {
				try {
					const user = await User.findById(jwtPayload.userId)
					return done(null, user)
				} catch (err) {
					return done(err)
				}
			}
		)
	)

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id)
			return done(null, user)
		} catch (err) {
			return done(err)
		}
	})

	return passport
}
