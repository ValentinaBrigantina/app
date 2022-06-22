const { omit } = require('lodash')
const { createHash, createJwtTokenAsync } = require('../services/auth')
const { AppError } = require('../utils/app-errors')
const { randomUUID } = require('crypto')
const userModel = require('../models/user')

exports.renderSignUp = (req, res)=> {
    res.render('sign_up')
}

exports.renderSignIn = (req, res)=> {
    res.render('sign_in')
}

exports.addNewUser = async (req, res) => {
    const {  name, password } = req.body
    if (!name || !password) {
        throw new AppError({ message: 'Login and password is required!', code: 400 })
    }
    const passwordHash = createHash(password)
   
    const resultData = {
        id: randomUUID(),
        name: name,
        passwordHash: passwordHash,
    }

    const createResult = await userModel.createNewUserModel(resultData)
    if (!createResult) {
        throw new AppError({ message: 'User already exists.', code: 409 })
    }

    const result = omit(resultData, ['passwordHash'])
    res.send(result)
}

exports.authenticateUser = async (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        throw new AppError({ message: 'Login and password is required!', code: 400 })
    }
    const passwordHash = createHash(password)
    const user = await userModel.findUserByName(name)

    if (!user || user.passwordHash !== passwordHash) {
        throw new AppError({ message: 'Authorized error', code: 401 })
    }

    const token = await createJwtTokenAsync({
        sub: user.id,
        iat: Math.floor(Date.now() / 1000),
    })
    res.send({ token })
}