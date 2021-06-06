


const express = require('express')
const route = express.Router()
const productController = require('../controllers/product')
const {authenticateJWT} = require('../middleware/authenticator')
const upload = require('../middleware/multer')

route.post('/' , authenticateJWT , upload.single('productImage') ,
    productController.create
  )


module.exports = route

