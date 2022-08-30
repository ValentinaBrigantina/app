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
            image: true,
        },
    })
    res.send(user)
}

exports.getUserById = async (req, res) => {
    const user = await dbClient.user.findUnique({
        where: { id: req.body.id },
        select: {
            id: true,
            name: true,
            passwordHash: true,
            image: true,
        },
    })
    res.send(user)
}

exports.updateUserData = async (req, res) => {
    const { id, name, image } = req.body
    const user = await dbClient.user.update({
        where: { id: parseInt(id) },
        data: {
            name,
            image,
        }
    })
    res.send(user)
}

exports.deleteUserData = async (req, res) => {
    const { id } = req.body
    const user = await dbClient.user.delete({
        where: { id: parseInt(id) }
    })
    res.send(user)
}