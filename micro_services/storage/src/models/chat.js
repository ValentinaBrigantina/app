const dbClient = require('../db-client')

exports.createNewMessage = async (req, res) => {
    const { message, date, authorId } = req.body
    const result = await dbClient.chatMessage.create({
        data: {
            message,
            date,
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
    const messages = await dbClient.chatMessage.findMany()
    res.send(messages)
}