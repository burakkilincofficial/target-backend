const router = require('express').Router()
const targetController = require('../controllers/target')
const passport = require('passport')

module.exports = app => {

	router.post('/', targetController.create)
	router.get('/', targetController.findAll)
	router.get('/:targetId', targetController.findOne)
	router.put('/:targetId', targetController.update)
	router.delete('/:targetId', targetController.delete)
	router.patch('/:targetId', targetController.increment)
	router.patch('/:targetId', targetController.decrement)

	app.use('/v1/target', passport.authenticate('jwt', { session: false }), router)
}
