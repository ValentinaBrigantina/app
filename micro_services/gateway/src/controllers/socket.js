const socketModel = require('../models/socket')
const { parsingDate } = require('../utils/date-parsing')

const addMessageToJson = async (data) => {
    const result = await socketModel.addNewMessage(data)
}

exports.socketHandlers = {
    async onChatMessage(socket, data) {
        data.date = parsingDate(data.date)
        await addMessageToJson(data)
        return data
    }
}

exports.renderChat = (req, res)=> {
    res.render('chat')
}

exports.getMessage = async (req, res) => {
    const messagesList = await socketModel.fetchAllMessages()
    res.send(messagesList)
}