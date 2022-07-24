const { resolve } = require('path')
const formidable = require('formidable')
const { randomUUID } = require('crypto')
const { readJSONAsync, writeJSONAsync } = require('../utils/JSON')

const dbPetJsonPath = resolve(process.cwd(), 'src/services/db_pets.json')

exports.fetchAllPets = () => readJSONAsync(dbPetJsonPath)

exports.upload = () => {
    const form = formidable({
        uploadDir: `${process.cwd()}/public/images/`,
        multiples: true,
        keepExtensions: true,
        filename: (name, ext, {originalFilename}) => `${randomUUID()}${ext}`,
    })
    return form
}

exports.addNewPet = async (data) => {
    const pets = await readJSONAsync(dbPetJsonPath)
    pets.push(data)
    await writeJSONAsync(dbPetJsonPath, pets)
}