const formidable = require('formidable')
const { randomUUID } = require('crypto')

exports.uploadFileToGallery = (req) => new Promise(((resolve, reject) => {
    formidable({
        uploadDir: `${process.cwd()}/public/images/gallery`,
        multiples: true,
        keepExtensions: true,
        filename: (name, ext, {originalFilename}) => `${randomUUID()}${ext}`,
    })
        .parse(req, (err, { caption, authorId }, { photo }) => {
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
            "image": avatar.originalFilename ? `images/users/${avatar.newFilename}` : "",
            })
    })
}))