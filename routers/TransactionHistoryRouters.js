const Router = require('express').Router()
const TransactionHistory = require('../controllers/TransactionHistoryControllers')
const Autorisasion = require('../middlewares/AutorisasionAdmins')


Router.post('/', TransactionHistory.Create)
Router.get('/user', TransactionHistory.getTransactionUser)
Router.use(Autorisasion)
Router.get('/admin', TransactionHistory.getAllTransaction)
Router.get('/:transactionId', TransactionHistory.getTransactionById)

module.exports = Router