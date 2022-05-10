const Target = require('../models/target')

exports.create = async (req, res, next) => {
	try {
		const target = new Target({
			userId: req.user.id,
			title: req.body.title,
			targetScore: req.body.targetScore
		})
		await target.save()
		res.status(201).send({ msg: 'target was creted successfully' })
	} catch (err) {
		return next(err)
	}
}

exports.findAll = async (req, res) => {
	const targets = await Target.find({ userId: req.user.id })
	res.status(200).json({ targets })
}

exports.findOne = async (req, res) => {
	const target = await Target.findOne({ _id: req.params.targetId, userId: req.user.id })
	if (!target)
		return res.status(400).send({ msg: 'Could not find target' })
	res.status(200).json({ target })
}

exports.update = async (req, res, next) => {
	try {
		let target = await Target.findOne({ _id: req.params.targetId, userId: req.user.id })

		if (!target)
			return res.status(400).send({ msg: 'Could not find target' })

		target.title = req.body.title
		target.currentScore = req.body.currentScore
		target.targetScore = req.body.targetScore
		await target.save()

		res.status(200).send({ msg: 'target was updated successfully' })
	} catch (err) {
		return next(err)
	}
}

exports.delete = async (req, res) => {
	const target = await Target.findOne({ _id: req.params.targetId, userId: req.user.id })
	if (!target)
		return res.status(200).send({ msg: 'Could not find target' })

	await target.delete()

	res.status(200).send({ msg: 'target was deleted successfully' })
}

exports.increment = async (req, res, next) => {
	try {
		let target = await Target.findOne({ _id: req.params.targetId, userId: req.user.id })

		if (!target)
			return res.status(400).send({ msg: 'Could not find target' })

		target.currentScore += 1
		await target.save()

		res.status(200).send({ msg: 'target was incremented successfully' })
	} catch (err) {
		return next(err)
	}
}

exports.decrement = async (req, res, next) => {
	try {
		let target = await Target.findOne({ _id: req.params.targetId, userId: req.user.id })

		if (!target)
			return res.status(400).send({ msg: 'Could not find target' })

		target.currentScore -= 1
		await target.save()

		res.status(200).send({ msg: 'target was decremented successfully' })
	} catch (err) {
		return next(err)
	}
}
