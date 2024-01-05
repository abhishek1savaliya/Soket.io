const http = require("http")
const express = require('express')
const path = require('path')
const { Server } = require('socket.io')
const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = new Server(server)

//socket.io 
io.on('connection', (socket) => {
    socket.on('message', (message) => {
        io.emit('message', message)
    })
})

app.use(express.static(path.resolve("./public")))

app.get('/', (res, req) => {
    return res.sendFile('./public/index.html')
})

server.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT 5000")
})