const express = require('express')
const { json } = require('sequelize')
const {config} = require('dotenv').config()
const User = require('./routers/UserRouters')
const Product = require('./routers/ProductRouters')
const Category = require('./routers/CategoryRouters')
const transactionHistories = require('./routers/TransactionHistoryRouters')
const Middleware = require('./middlewares/AuthenticationMiddleware')
require('dotenv').config();



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/users', User)
app.use(Middleware)
app.use('/categories', Category)
app.use('/products', Product)
app.use('/transactions', transactionHistories)

app.listen(process.env.PORT, () => {
   console.log(`Base URL : localhost:${process.env.PORT}`)
})