const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	verified: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
		required: true,
		index: true,
		unique: true,
		default: () => crypto.randomBytes(20).toString('hex'),
	},
},
    {timestamps: true})

async function generateHash(password) {
	return bcrypt.hash(password, 12);
}

userSchema.pre('save', function preSave(next) {
	const user = this;
	if (user.isModified('password')) {
		return generateHash(user.password)
			.then((hash) => {
				user.password = hash
				return next()
			})
			.catch((error) => {
				return next(error)
			})
	}
	return next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
