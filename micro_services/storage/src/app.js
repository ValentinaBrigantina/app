const express = require('express')
const app = express()

const errorHandler = require('./middleware/global-error-handler')
const router = require('./router')

const port = parseInt(process.env.PORT) || 4000

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })


app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res
        .status(isNumber(err.code) ? err.code : 500)
        .send({
            code: err.code || 500,
            message: err.message,
        })
  })
app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`We are listeting internal http://127.0.0.1:${port}`)
})