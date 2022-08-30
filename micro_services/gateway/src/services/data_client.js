const { got } = require('got-cjs')

const prepareUrl = path => `${process.env.STORAGE_URL}/${path}`

exports.createNewUser = (json) => {
    const url = prepareUrl('user')
    return got.post(url, { json }).json()
}

exports.getUserByName = async (name) => {
    const url = prepareUrl('user/login')
    const data = await got.post(url, { json: { name } })
        .json()
    return data ? data : null
}

exports.getUserById = async (id) => {
    const url = prepareUrl('user/name')
    const data = await got.post(url, { json: { id } })
        .json()
    return data ? data : null
}

exports.updateUserData = (json) => {
    const url = prepareUrl(`user/${json.id}`)
    return got.put(url, { json }).json() 
}

exports.deleteUser = (id) => {
    const url = prepareUrl(`user/${id}`)
    return got.delete(url, { json: { id } }).json()
}

exports.createNewPhoto = (json) => {
    const url = prepareUrl('image/upload')
    return got.post(url, { json }).json()
}

exports.getImagesList = () => {
    const url = prepareUrl('gallery')
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