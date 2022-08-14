const { omit } = require('lodash')
const { createHash, createJwtTokenAsync, getIdFromToken } = require('../services/auth')
const { AppError } = require('../utils/app-errors')
const {  getUserByName, createNewUser, getUserById } = require('../services/data_client')

exports.renderSignUp = (req, res)=> {
    res.render('sign_up')
}

exports.renderSignIn = (req, res)=> {
    res.render('sign_in')
}

exports.renderSignOut = (req, res)=> {
    res.render('log_out')
}

exports.createUser = async (req, res) => {
    const { password, name } = req.body
    const passwordHash = createHash(password)
    const resultData = await createNewUser({
        passwordHash,
        name,
    })
    const result = omit(resultData, ['passwordHash'])
    res.send(result)
}

exports.authenticateUser = async (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        throw new AppError({ message: 'Login and password is required!', code: 400 })
    }
    const passwordHash = createHash(password)
    const currentUser = await getUserByName(name)
    if (!currentUser || currentUser.passwordHash !== passwordHash) {
        throw new AppError({ message: 'Authorized error', code: 401 })
    }

    const token = await createJwtTokenAsync({
        sub: currentUser.id,
        iat: Math.floor(Date.now() / 1000),
    })
    res.send({ token, name })
}

exports.userVerification = async (req, res) => {
    const { token } = req.body
    const authorId = await getIdFromToken(token)
    const currentUser = await getUserById(authorId)
    res.send(currentUser || {})
}