exports.createNewPet = {
    type: 'object',
    properties: {
        name: {
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