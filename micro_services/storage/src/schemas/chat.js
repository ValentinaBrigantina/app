exports.createNewMessage = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
        },
        date: {
            type: 'string',
        },
        authorId: {
            type: 'number',
        },
    },
    required: ['message', 'date', 'authorId'],
    additionalProperties: true,
}