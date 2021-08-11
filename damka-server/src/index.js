const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
// io.set('transports', ['websocket']);
io.on('connection', socket => {
  socket.on('message', (data) => {
    console.log(data)
    io.emit('message',  data)
  })
})

http.listen(4000, function() {
  console.log('listening on port 4000')
})
