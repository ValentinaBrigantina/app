const formidable = require('formidable')
const { randomUUID } = require('crypto')

exports.uploadFileToGallery = (req) => new Promise(((resolve, reject) => {
    formidable({
        uploadDir: `${process.cwd()}/public/images/gallery/`,
        multiples: true,
        keepExtensions: true,
        filename: (name, ext, {originalFilename}) => `${randomUUID()}${ext}`,
    })
        .parse(req, (err, { petName }, { multipleFiles }) => {
        if (err) {
            reject (err)
        }
        resolve ({
            "name": petName,
            "originalFilename": multipleFiles.originalFilename,
            "image": `images/gallery/${multipleFiles.newFilename}`,
            })
    })
}))

exports.uploadFileToAvatar = (req) => new Promise(((resolve, reject) => {
    formidable({
        uploadDir: `${process.cwd()}/public/images/users`,
    })
        .parse(req, (err, { name_user, password }, { avatar }) => {
        if (err) {
            reject (err)
        }
        resolve ({
            "name": name_user,
            "password": password,
            "image": `images/users/${avatar.newFilename}`,
            })
    })
}))