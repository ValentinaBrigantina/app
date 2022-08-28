const formidable = require('formidable')
const { randomUUID } = require('crypto')

exports.uploadFileToSys = (path) =>  {
    const form = formidable({
        uploadDir: `${process.cwd()}${path}`,
        multiples: true,
        keepExtensions: true,
        filename: (name, ext, {originalFilename}) => `${randomUUID()}${ext}`,
    })
    return form
}

exports.parseFileToGallery = (formUpload, req) => new Promise((resolve, reject) => {
    formUpload.parse(req, (err, { caption, authorId }, { photo }) => {
        if (err) {
            reject (err)
        }
        resolve ({
            "caption": caption,
            "originalFilename": photo.originalFilename,
            "image": `images/gallery/${photo.newFilename}`,
            "authorId": authorId
            })
    })
})


exports.parseFileToProfile = (formUpload, req) => new Promise(((resolve, reject) => {
    formUpload.parse(req, (err, { name_user, password }, { avatar }) => {
        if (err) {
            reject (err)
        }
        resolve ({
            "name": name_user,
            "password": password,
            "image": avatar.originalFilename ? `images/users/${avatar.newFilename}` : "",
            })
    })
}))