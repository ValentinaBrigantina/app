const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const ajv = new Ajv()
addFormats(ajv)

module.exports = (schema) => {
    if (!schema) {
        throw new Error('Validation schema is required!')
    }
    const validate = ajv.compile(schema)

    return async (req, res, next) => {
        if (validate(req.body)) {
            await next()
        } else {
            req.throw(400, 'Invalid data!')
        }
    }
}