const mongoose = require('mongoose')

const targetSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	currentScore: {
		type: Number,
		default: 0
	},
	targetScore: {
		type: Number,
		required: true
	}
},
    {timestamps: true})

module.exports = mongoose.model('Target', targetSchema)
