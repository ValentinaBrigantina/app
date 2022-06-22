const { randomUUID } = require('crypto')
const { resolve } = require('path')
const petModel = require('../models/pet')

exports.renderGallery = (req, res) => {
    res.render('main_page')
}

exports.renderUploadImage = (req, res) => {
    res.render('upload_image')
}

exports.getPets = async (req, res) => {
    const petsList = await petModel.fetchAllPets()
    res.send(petsList)
}

exports.uploadPet = async (req, res) => {
    const form = petModel.upload()
    form.parse(req, async (err, { petName }, { multipleFiles }) => {
        const petData = {
            "name": petName,
            "originalFilename": multipleFiles.originalFilename,
            "image": `images/${multipleFiles.newFilename}`,
            "id": randomUUID()
        }
        if (multipleFiles.size === 0) return
        if (err) {
            return reject(err)
        }
        await petModel.addNewPet(petData)
        
        res.render('success_upload')
    })
}