const { got } = require('got-cjs')

const prepareUrl = path => `${process.env.STORAGE_URL}/${path}`

exports.createNewUser = (json) => {
    const url = prepareUrl('user')
    return got.post(url, { json }).json()
}

exports.getUserByName = (name) => {
    const url = prepareUrl('user/login')
    return got.post(url, { json: { name } })
        .json()
        .then(data => data ? data : null)
}

exports.getUserById = (id) => {
    const url = prepareUrl('user/name')
    return got.post(url, { json: { id } })
        .json()
        .then(data => data ? data : null)
}

exports.createNewPet = (json) => {
    const url = prepareUrl('image/upload')
    return got.post(url, { json }).json()
}

exports.getPetsList = () => {
    const url = prepareUrl('pet')
    return got.get(url).json()
}

exports.createNewMessage = (json) => {
    const url = prepareUrl('chat')
    return got.post(url, { json }).json()
}

exports.getMessagesList = () => {
    const url = prepareUrl('chat/list')
    return got.get(url).json()
}