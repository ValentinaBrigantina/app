const { uploadFileToSys, parseFileToGallery } = require('../services/upload')
const { createNewPhoto, getImagesList, getUserById, deleteImage, getPhotoByPath } = require('../services/data_client')

exports.renderGallery = (req, res) => {
    res.render('main_page')
}

exports.renderUploadImage = (req, res) => {
    res.render('upload_image')
}

exports.getImages = async (req, res) => {
    const imagesList = await getImagesList()
    const result = await Promise.all(
        imagesList.map(async (item) => {
        const currentUser = await getUserById(item.authorId)
        item.avatar = currentUser.image
        item.name = currentUser.name
        return item
    }))
    res.send(result)
}

exports.uploadPhoto = async (req, res) => {
    const pathToUpload = '/public/images/gallery'
    const formUpload = uploadFileToSys(pathToUpload)
    const imageData = await parseFileToGallery(formUpload, req)
    await createNewPhoto(imageData)
    res.send(imageData)
}

exports.givePhoto = async (req, res) => {
    const { image } = req.body
    const currentPhoto = await getPhotoByPath(image)
    res.send(currentPhoto)
}

exports.deletePhoto = async (req, res) => {
    const id = req.params.imageId
    const result = await deleteImage(id)
    res.send(result)
}