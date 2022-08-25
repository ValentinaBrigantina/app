const { uploadFileToGallery } = require('../services/upload')
const { createNewPet, getPetsList } = require('../services/data_client')

exports.renderGallery = (req, res) => {
    res.render('main_page')
}

exports.renderUploadImage = (req, res) => {
    res.render('upload_image')
}

exports.getPets = async (req, res) => {
    const petsList = await getPetsList()
    res.send(petsList)
}

exports.uploadPet = async (req, res) => {
    const petData = await uploadFileToGallery(req)
    await createNewPet(petData)
        
    res.render('success_upload')
}