const Router = require('express').Router()
const User = require('../controllers/UserControllers')
const Middleware = require('../middlewares/AuthenticationMiddleware')

Router.post('/register', User.Register)
Router.post('/login', User.Login)
Router.use(Middleware)
Router.put('/:userId', User.Update)
Router.delete('/:userId', User.Delete)
Router.patch('/topup', User.topUp)

module.exports = Router