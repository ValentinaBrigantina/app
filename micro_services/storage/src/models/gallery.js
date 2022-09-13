const dbClient = require('../db-client')

exports.createNewPhoto = async (req, res) => {
    const { caption, originalFilename, image, authorId } = req.body
    const result = await dbClient.photo.create({
        data: {
            caption,
            originalFilename,
            image,
            author: {
                connect: {
                    id: parseInt(authorId),
                }
            }
        }
    })
    res.send(result)
}

exports.getList = async (req, res) => {
    const images = await dbClient.photo.findMany()
    res.send(images)
}

exports.getPhotoByPath = async (req, res) => {
    const { image } = req.body
    const currentImage = await dbClient.photo.findUnique({
        where: { image: image },
        select: {
            id: true,
            caption: true,
            originalFilename: true,
            authorId: true,
        },
    })
    res.send(currentImage)
}

exports.deleteImage = async (req, res) => {
    const { id } = req.body
    const photo = await dbClient.photo.delete({
        where: { id: parseInt(id) }
    })
    res.send(photo)
}