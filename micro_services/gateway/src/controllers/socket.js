const { getIdFromToken } = require('../services/auth')
const {  getUserById, createNewMessage, getMessagesList } = require('../services/data_client')

exports.socketHandlers = {
    async onChatMessage(socket, data) {
        const authorId = getIdFromToken(data.userToken)
        data.authorId = authorId
        await createNewMessage(data)
        const currentUser = await getUserById(authorId)
        data.avatar = currentUser.image
        data.name = currentUser.name
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
        const currentUser = await getUserById(item.authorId)
        item.avatar = currentUser.image
        item.name = currentUser.name
        return item
    }))
    res.send(result)
}