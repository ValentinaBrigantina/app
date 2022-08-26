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