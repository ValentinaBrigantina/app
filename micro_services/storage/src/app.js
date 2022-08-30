const express = require('express')
const app = express()

const router = require('./router')

const port = parseInt(process.env.PORT) || 4000

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
app.use(router)

app.listen(port, () => {
    console.log(`Storage started on http://127.0.0.1:${port}`)
})