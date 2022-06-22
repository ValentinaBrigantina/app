const { Router } = require('express')
const petController = require('./controllers/pet')
const userController = require('./controllers/user')
const asyncErrorHandler = require('./utils/async-error-handler')

const router = Router()

router.get('/', petController.renderGallery)
router.get('/upload_image', petController.renderUploadImage)
router.get('/sign_up', userController.renderSignUp)
router.get('/sign_in', userController.renderSignIn)
router.get('/pet', asyncErrorHandler(petController.getPets))
router.post('/user', asyncErrorHandler(userController.addNewUser))
router.post('/user/login', asyncErrorHandler(userController.authenticateUser))
router.post('/image/upload', asyncErrorHandler(petController.uploadPet))


router.get('*', (req, res) => {
    res.render('error404')
})

module.exports = router
