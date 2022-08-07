exports.createNewMessage = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
        },
        date: {
            type: 'string',
        },
        author: {
            type: 'string',
        },
    },
    required: ['message', 'date', 'author'],
    additionalProperties: true,
}