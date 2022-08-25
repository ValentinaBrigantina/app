const { getIdFromToken } = require('../services/auth')
const {  getUserById, getUserByName, createNewMessage, getMessagesList } = require('../services/data_client')

exports.socketHandlers = {
    async onChatMessage(socket, data) {
        const authorId = getIdFromToken(data.author)
        const currentUser = await getUserById(authorId)
        data.author = currentUser.name
        await createNewMessage(data)
        data.avatar = currentUser.image
        return data
    }
}

exports.renderChat = (req, res)=> {
    res.render('chat')
}

exports.getMessage = async (req, res) => {
    const messagesList = await getMessagesList()
    const result = await Promise.all(
        messagesList.map(async (item) => {
        const currentUser = await getUserByName(item.author)
        item.avatar = currentUser.image
        return item
    }))
    res.send(result)
}