const { got } = require('got-cjs')

exports.createNewUser = (json) => got.post('http://localhost:4000/user', { json }).json()

exports.getUserByName = (name) => {
    return got.post('http://localhost:4000/user/login', { json: { name } })
        .json()
        .then(data => data ? data : null)
}
