const Models = require('../models/index')

class CategoryController {
    static async Create(req, res) {
        try {
            const {type} = req.body
            const createCategory = await Models.Category.create({type : type, sold_product_amount : 0})
            const Category = await Models.Category.findOne({where  : {id : createCategory.id}, attributes : ['id', 'type', 'updatedAt', 'createdAt', 'sold_product_amount']})
            return res.status(201).json({
                category : Category
            })
        }  catch (err) {
            console.log(err)
            return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
        }
    }

    static async GetAll(req, res) {
        try {
            const Category = await Models.Category.findAll({include : [
                {
                    model : Models.Product,
                    as : 'Products'
                }
            ]})
            return res.status(200).json({
                categories : Category
            })
        } catch (err) {
            return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
        }
    }
    static async Update(req, res) {
        try {
            const {categoriesId} = req.params
            const {type} = req.body
            await Models.Category.update({type : type}, {where : {id : categoriesId}})
            const Category = await Models.Category.findOne({where  : {id : categoriesId}, attributes : ['id', 'type', 'updatedAt', 'createdAt', 'sold_product_amount']})
            return res.status(201).json({
                category : Category
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
            const {categoriesId} = req.params
            await Models.Category.destroy({where : {id : categoriesId}})
            return res.status(200).json({
                message : "Category has been successfully deleted"
            })
        } catch (err) {
             return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
        }
    }
}

module.exports = CategoryController