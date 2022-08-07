const { parsingDate } = require('../utils/date-parsing')
const { getIdFromToken } = require('../services/auth')
const {  getUserById, createNewMessage, getMessagesList } = require('../services/data_client')

exports.socketHandlers = {
    async onChatMessage(socket, data) {
        if (data.author !== 'unknown') {
            const authorId = getIdFromToken(data.author)
            const currentUser = await getUserById(authorId)
            data.author = currentUser.name
        }
        data.date = parsingDate(data.date)
        await createNewMessage(data)
        return data
    }
}

exports.renderChat = (req, res)=> {
    res.render('chat')
}

exports.getMessage = async (req, res) => {
    const messagesList = await getMessagesList()
    res.send(messagesList)
}