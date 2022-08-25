exports.createNewUser = {
    type: 'object',
    properties: {
        passwordHash: {
            type: 'string',
            minLength: 20,
        },
        name: {
            type: 'string',
        },
        image: {
            type: 'string'
        }
    },
    required: ['passwordHash', 'name'],
    additionalProperties: true,
}