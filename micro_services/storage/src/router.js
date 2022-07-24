const { Router } = require('express')

const userModel = require('./models/user')
const petModel = require('./models/pet')
const chatModel = require('./models/chat')
const userSchema = require('./schemas/user')
const validationMiddleware = require('./middleware/validation-middleware')

const router = Router()

router.post('/user', validationMiddleware(userSchema.createNewUser), userModel.createNewUser)
router.post('/user/login', userModel.getUserByName)

module.exports = router