const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
	JWT_SECRET: process.env.JWT_SECRET,
	COOKIE_SEESION_KEY_1: process.env.COOKIE_SEESION_KEY_1,
	COOKIE_SEESION_KEY_2: process.env.COOKIE_SEESION_KEY_2,
}
