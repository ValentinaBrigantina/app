const { resolve } = require('path')
const { readJSONAsync, writeJSONAsync } = require('../utils/JSON')

const dbChatJsonPath = resolve(process.cwd(), 'src/services/db_chat.json')

exports.fetchAllMessages = () => readJSONAsync(dbChatJsonPath)

exports.addNewMessage = async (data) => {
    const messages = await readJSONAsync(dbChatJsonPath)
    messages.push(data)
    await writeJSONAsync(dbChatJsonPath, messages)
}