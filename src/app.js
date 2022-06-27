const { join, resolve } = require('path')
require('dotenv').config({
  path: resolve(__dirname, '..', '.env')
})

const express = require('express')
const { isNumber } = require('lodash')
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

io.on("connection", (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
})

const router = require('./router')

const port = parseInt(process.env.PORT) || 3000

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

httpServer.listen(port)