const { uploadFileToGallery } = require('../services/upload')
const { createNewPhoto, getImagesList, getUserById } = require('../services/data_client')

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
    const imageData = await uploadFileToGallery(req)
    await createNewPhoto(imageData)
        
    res.send(imageData)
}