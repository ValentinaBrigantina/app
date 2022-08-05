const formidable = require('formidable')
const { randomUUID } = require('crypto')

exports.uploadFileToFileSys = (req) => new Promise(((resolve, reject) => {
    formidable({
        uploadDir: `${process.cwd()}/public/images/`,
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
            "image": `images/${multipleFiles.newFilename}`,
            })
    })
}))