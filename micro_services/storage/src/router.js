const { Router } = require('express')

const userModel = require('./models/user')
const galleryModel = require('./models/gallery')
const chatModel = require('./models/chat')
const userSchema = require('./schemas/user')
const photoSchema = require('./schemas/photo')
const chatSchema = require('./schemas/chat')
const validationMiddleware = require('./middleware/validation-middleware')

const router = Router()

router.get('/gallery', galleryModel.getList)
router.post('/user', validationMiddleware(userSchema.createNewUser), userModel.createNewUser)
router.post('/user/login', userModel.getUserByName)
router.post('/user/name', userModel.getUserById)
router.post('/image/upload', validationMiddleware(photoSchema.createNewPhoto), galleryModel.createNewPhoto)
router.post('/chat', validationMiddleware(chatSchema.createNewMessage), chatModel.createNewMessage)
router.get('/chat/list', chatModel.getList)

module.exports = router