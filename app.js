const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', (data) => {
    console.log('data', data)
    io.emit('chat message', data)
  })
})

const port = 3000
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
