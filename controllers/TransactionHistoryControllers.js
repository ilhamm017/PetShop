const { json } = require('sequelize')
const Models = require('../models/index')
const item = require('../models/item')

class TransactionHistoryController {
   static async Create(req, res) {
       const {id} = req.user
     try {
        const {productId, quantity} = req.body
        //validasi product tersedia atau tidak
        const validateProduct = await Models.Product.findOne({where  : {id : productId}})
        if(!validateProduct) return res.status(404).json({
         message : "Product Id tidak di temukan"
        })
         if(quantity > validateProduct.stock) return res.status(404).json({
         message : "Jumlah produk tidak mengcukupi"
        })
        //vadasi balance user mengcukupi atau tidak
        const validateUserBalance = await Models.User.findOne({where : {id : id}})
        if((validateProduct.price*quantity) > validateUserBalance.balance) return res.status(404).json({
         message : "Balance tidak mengcukupi"
        })
        //update balance di kurangi dengan harga produk yang di beli
        const total = validateProduct.price*quantity
        await Models.User.update({balance : validateUserBalance.balance-total}, {where : {id : id}})
        // buat histori transaksi user
        const  createTransactionHistory = await Models.TransactionHistory.create({ProductId :productId, quantity : quantity, total_price : total, UserId : id})
        // update stock  yang di kurangi total jumlah product yang di beli user
        await Models.Product.update({stock : validateProduct.stock-quantity}, {where : {id : productId}})
        // update sold_product_amount 
        const Category = await Models.Category.findOne({where : {id : validateProduct.CategoryId}})
        await Models.Category.update({sold_product_amount : Category.sold_product_amount+quantity}, {where : {id :Category.id}})
        return res.status(200).json({
         message : "Your have successfully purchase the product",
         transactionBill : {
            total_price : `Rp.${createTransactionHistory.total_price}`,
            quantity : createTransactionHistory.quantity,
            product_name : validateProduct.title
         }
        })
    } catch (err){
      return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
    }
   }

   static async getTransactionUser(req, res) {
       const {id} = req.user
      try{
         let transactionHistoryUser = await Models.TransactionHistory.findAll({where : {UserId  : id}, attributes : {exclude :
         ['id']}, include : [
            {
               model : Models.Product,
               attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
         ]})
         for(let i = 0; i<transactionHistoryUser.length;i++){
            transactionHistoryUser[i].total_price = `Rp. ${transactionHistoryUser[i].total_price}`
            transactionHistoryUser[i].Product.price = `Rp. ${transactionHistoryUser[i].Product.price}`
         }
         return res.status(200).json({
            transactionHistories : transactionHistoryUser
         })
      } catch (err){
         return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
      }
   }

   static async getAllTransaction(req, res){
      try {
         let allTransactionHistoryUser = await Models.TransactionHistory.findAll({attributes : {exclude :
         ['id']}, include : [
            {
               model : Models.Product,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
               model : Models.User,
               attributes : ['id', 'email', 'balance', 'gender', 'role']
            }
         ]})
         for(let i = 0; i<allTransactionHistoryUser.length;i++){
             allTransactionHistoryUser[i].total_price = `Rp. ${allTransactionHistoryUser[i].total_price}`
            allTransactionHistoryUser[i].Product.price = `Rp. ${allTransactionHistoryUser[i].Product.price}`
         }
         return res.status(200).json({
            transactionHistories : allTransactionHistoryUser
         })
      } catch (err){
         return res.status(500).json({
                message : "try again",
                errorMessage : err.message 
            })
      }
   }

   static async getTransactionById(req,res) {
      try{
         const {transactionId} = req.params
         let transactionHistoryById = await Models.TransactionHistory.findOne({where : {id : transactionId}, attributes : {exclude :
         ['id']}, include : [
            {
               model : Models.Product,
               attributes : {
                  exclude : ['createdAt', 'updatedAt']
               }
            }
         ]})
         console.log(transactionHistoryById)
         if(!transactionHistoryById) return res.status(404).json({
         message : "Transaksi tidak di temukan"
        })
         transactionHistoryById.total_price = `Rp. ${transactionHistoryById.total_price}`
         transactionHistoryById.Product.price = `Rp. ${transactionHistoryById.Product.price}`
         return res.status(200).json(transactionHistoryById)
      } catch (err){

      }
   }


   static async addToTransactionCart(req, res) {
      const { id } = req.user;
      try {
        const { productId, quantity } = req.body;
    
        // Validasi product tersedia atau tidak
        const validateProduct = await Models.Product.findOne({ where: { id: productId } });
        if (!validateProduct)
          return res.status(404).json({ message: "Product Id tidak ditemukan" });
    
        // Cek apakah stock tersedia cukup
        if (quantity > validateProduct.stock)
          return res.status(404).json({ message: "Jumlah produk tidak mengcukupi" });
         
         // Buat item baru
         const newItem = {
            ProductId: productId,
            quantity,
            total_price: validateProduct.price * quantity
         }
         
         if (validateProduct) {
           const sameProduk = await Models.Item.findOne({ where: { id: productId}})
           if (sameProduk) {
             await Models.Item.update({
               quantity: quantity + newItem.quantity,
               total_price: total_price + newItem.total_price
             }, {
               where: {
                  id: productId
               }
             })
             return res.status(404).json({ message: "Jumlah produk ditambahkan" });
           }
         }

        // Simpan item ke database
        await Models.Item.create(newItem);
    
        // Tambahkan item baru ke keranjang belanja user
        const userCart = await Models.TransactionHistory.findOne({
          where: { UserId: id, checkout: false },
        });
        
        userCart.Items.push(newItem);
        await userCart.create();
    
        return res.status(200).json({
          message: "Product berhasil ditambahkan ke keranjang belanja",
          cart: userCart,
        });
      } catch (err) {
        return res.status(500).json({
          message: "Try again",
          errorMessage: err.message,
        });
      }
    }
    

}

module.exports = TransactionHistoryController