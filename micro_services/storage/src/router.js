const { Router } = require('express')

const userModel = require('./models/user')
const petModel = require('./models/pet')
const chatModel = require('./models/chat')
const userSchema = require('./schemas/user')
const petSchema = require('./schemas/pet')
const validationMiddleware = require('./middleware/validation-middleware')

const router = Router()

router.get('/pet', petModel.getList)
router.post('/user', validationMiddleware(userSchema.createNewUser), userModel.createNewUser)
router.post('/user/login', userModel.getUserByName)
router.post('/image/upload', validationMiddleware(petSchema.createNewPet), petModel.createNewPet)

module.exports = router