
const express = require('express')
const route = express.Router()
const categoryController = require('../controllers/category')
const {authenticateJWT} = require('../middleware/authenticator')

route.post('/' , authenticateJWT , categoryController.create)
route.get('/' , authenticateJWT , categoryController.readAll)


module.exports = route