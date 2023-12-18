const Router = require('express').Router()
const Product = require('../controllers/ProductControllers')
const Autorisasion = require('../middlewares/AutorisasionAdmins')

Router.get('/', Product.getAll)
Router.use(Autorisasion)
Router.post('/', Product.Create)
Router.put('/:productId', Product.updateAll)
Router.patch('/:productId', Product.updateCategoryId)
Router.delete('/:productId', Product.Delete)

module.exports = Router