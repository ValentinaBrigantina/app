const { join, resolve } = require('path')
require('dotenv').config({
  path: resolve(__dirname, '..', '.env')
})

const express = require('express')
const cors = require('cors')
const { isNumber } = require('lodash')
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const { socketHandlers } = require('./controllers/socket')

io.on("connection", (socket) => {
  for (let [name, handler] of Object.entries(socketHandlers)) {
    socket.on(name, async (data) => {
      const result = await handler(socket, data)
      io.emit(name, result);
    })
  }
})

const router = require('./router')
const port = parseInt(process.env.PORT) || 3000

if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
}

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.static(join(__dirname, '../', 'public')))
app.use(router)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res
      .status(isNumber(err.code) ? err.code : 500)
      .send({
          code: err.code || 500,
          message: err.message,
      })
})

httpServer.listen(port, () => {
  console.log(`Gateway started on http://127.0.0.1:${port}`)
})