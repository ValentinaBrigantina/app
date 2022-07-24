const dbClient = require('../db-client')

exports.createNewUser = async (req, res) => {
    const result = await dbClient.user.create({
        data: req.body
    })
    res.send(result)
}

exports.getUserByName = async (req, res) => {
    const user = await dbClient.user.findUnique({
        where: { name: req.body.name },
        select: {
            id: true,
            name: true,
            passwordHash: true,
        },
    })
    res.send(user)
}