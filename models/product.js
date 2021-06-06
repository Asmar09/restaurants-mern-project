const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required: true,
    },
    productName:{
        type:String,
        required: true,
        trim: true,
        maxLength: 60
    },
    productDesc:{
        type:String,
        required: true,
        trim: true,
    },
    productPrice:{
        type:Number,
        required: true,
    },
    productCategory:{
      type: ObjectId,
      ref: "Category",
      required: true
    },
    productQty:{
        type:Number,
        required: true,
    },
}, {timestamps: true})

const Product = mongoose.model("Product" , productSchema)

module.exports = Product