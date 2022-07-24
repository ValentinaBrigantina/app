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
    },
    required: ['passwordHash', 'name'],
    additionalProperties: true,
}