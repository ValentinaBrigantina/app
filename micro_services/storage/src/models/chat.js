const dbClient = require('../db-client')

exports.createNewMessage = async (req, res) => {
    const result = await dbClient.chat.create({
        data: req.body
    })
    res.send(result)
}

exports.getList = async (req, res) => {
    const messages = await dbClient.chat.findMany()
    res.send(messages)
}