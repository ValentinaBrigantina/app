const socketModel = require('../models/socket')


const addMessageToJson = async (data) => {
    const result = await socketModel.addNewMessage(data)
}

module.exports = {
    async onChatMessage(socket, data) {
        await addMessageToJson(data)
        return data
    },
}