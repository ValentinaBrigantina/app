const { Prisma } = require('@prisma/client')

module.exports = async (req, res, next) => {
    try {
        await next()
    } catch (err) {
        console.error(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(409).send({error: 'Database error!'})
            return
        }

        res.status(err.code || 500).send({error: err.message || 'Something going wrong!'})
    }
}

// module.exports = async (ctx, next) => {
//     try {
//         await next();
//     } catch (err) {
//         console.error(err)
//         if (err instanceof Prisma.PrismaClientKnownRequestError) {
//             ctx.response.status = 409
//             ctx.body = {
//                 message: 'Database error!'
//             }
//             return
//         }

//         ctx.response.status = err.code || 500;
//         ctx.body = {
//             message: err.message || 'Something going wrong!'
//         }
//     }
// }