const dbClient = require('../db-client')

exports.createNewPet = async (req, res) => {
    const result = await dbClient.pet.create({
        data: req.body
    })
    res.send(result)
}

exports.getList = async (req, res) => {
    const pets = await dbClient.pet.findMany()
    res.send(pets)
}