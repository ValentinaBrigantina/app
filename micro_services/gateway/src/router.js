const { Router } = require('express')
const galleryController = require('./controllers/gallery')
const userController = require('./controllers/user')
const asyncErrorHandler = require('./utils/async-error-handler')
const socketController = require('./controllers/socket')

const router = Router()

router.get('/', galleryController.renderGallery)
router.get('/upload_image', galleryController.renderUploadImage)
router.get('/chat', socketController.renderChat)
router.get('/messages', asyncErrorHandler(socketController.getMessage))
router.get('/sign_up', userController.renderSignUp)
router.get('/sign_in', userController.renderSignIn)
router.get('/setting_profile', userController.renderSettingProfile)
router.get('/sign_out', userController.renderSignOut)
router.get('/gallery', asyncErrorHandler(galleryController.getImages))
router.post('/user', asyncErrorHandler(userController.createUser))
router.post('/token', asyncErrorHandler(userController.userVerification))
router.post('/password', asyncErrorHandler(userController.passwordVerification))
router.post('/user/login', asyncErrorHandler(userController.authenticateUser))
router.post('/image/upload', asyncErrorHandler(galleryController.uploadPhoto))
router.put('/user/:userId', asyncErrorHandler(userController.updateUserById))


router.get('*', (req, res) => {
    res.render('error404')
})

module.exports = router
