const { where } = require('sequelize')
const Models = require('../models/index')

class ProductController {
    static async Create(req, res) {
        try {
            const createProduct =  await Models.Product.create(req.body)
            const Product = await Models.Product.findOne({where : {id : createProduct.id}})
            return res.status(201).json({
                product : Product
            })
        } catch (err){
            return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
        }
    }

    static async getAll(req, res) {
        try {
            let allProduct = await Models.Product.findAll()
            for(let i = 0; i < allProduct.length; i++) {
                allProduct[i].price = `Rp.${allProduct[i].price}`
            }
            return res.status(200).json({
                products : allProduct
            })
        } catch (err){
            return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
        }
    }

    static async updateAll(req, res) {
        try {
            const {productId} = req.params
            const {title, price, stock, CategoryId} = req.body
            const ValidateId = await Models.Product.findOne({where : {id : productId}})
            const validateCategoryId = await Models.Category.findOne({where : {id : CategoryId}})
            if(!ValidateId || !validateCategoryId) return res.status(404).json({
                message : "id prodct atau categori id tidak di temukan"
            })
            await Models.Product.update({title : title, price : price, stock : stock, CategoryId : CategoryId}, {where : {id : productId}})
            let Product = await Models.Product.findOne({where : {id : productId}})
            Product.price = `Rp. ${Product.price}`
            return res.status(200).json({
                product : Product
            })
        } catch (err){
            return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
        }
    }

    static async updateCategoryId(req, res) {
        try {
            const {productId} = req.params
            const {CategoryId} = req.body
            const ValidateId = await Models.Product.findOne({where : {id : productId}})
            const validateCategoryId = await Models.Category.findOne({where : {id : CategoryId}})
            if(!ValidateId || !validateCategoryId) return res.status(404).json({
                message : "id prodct atau categori id tidak di temukan"
            })
           await Models.Product.update({CategoryId : CategoryId}, {where : {id : productId}})
           let Product = await Models.Product.findOne({where : {id : productId}})
           Product.price = `Rp. ${Product.price}`
             return res.status(200).json({
                product : Product
            })
        } catch (err){
            return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
        }
    }

    static async Delete(req, res) {
        try {
            const {productId} = req.params
            await Models.Product.destroy({where : {id : productId}})
            return res.status(200).json({
                message : "Product has been successfully deleted"
            })
        } catch (err){
            return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
        }
    }

}

module.exports = ProductController