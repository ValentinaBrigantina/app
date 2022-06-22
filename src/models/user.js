const { resolve } = require('path')
const { readJSONAsync, writeJSONAsync } = require('../utils/JSON')

const dbUserJsonPath = resolve(process.cwd(), 'src/services/db_users.json')

exports.createNewUserModel = async (user) => {
    const allUsers = await readJSONAsync(dbUserJsonPath)

    const foundUser = allUsers.find((existingUser) => user.name === existingUser.name)
    if (foundUser) {
      return false
    }
  
    allUsers.push(user)
    await writeJSONAsync(dbUserJsonPath, allUsers)
    return true
}

exports.findUserByName =  async (name) => {
    const users = await readJSONAsync(dbUserJsonPath);
    return users.find((user) => user.name === name);
}