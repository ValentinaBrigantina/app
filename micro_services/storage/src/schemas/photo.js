exports.createNewPhoto = {
    type: 'object',
    properties: {
        caption: {
            type: 'string',
        },
        originalFilename: {
            type: 'string',
        },
        image: {
            type: 'string',
        },
    },
    required: ['originalFilename', 'image'],
    additionalProperties: true,
}