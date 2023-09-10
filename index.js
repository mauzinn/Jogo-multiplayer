const Express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('node:http')
const { join } = require('node:path')
const app = Express()
const server = createServer(app)
const io = new Server(server)
let players = 0

app.get('/', (req, res) => {
    res.sendFile(join(__dirname + '/pagina/index.html'))
})

io.on('connection', (socket) => {
    players += 1

    io.emit('player joined', {
        playersQuantity: players
    })

    socket.on('disconnect', () => {
        players -= 1

        io.emit('player disconnect', {
            playersQuantity: players
        })
    })
})


io.on('connection', (socket) => {
    socket.on('player MovimentT', (pos) => {
        io.emit('player MovimentT', pos)
    })

    socket.on('player MovimentL', (pos) => {
        io.emit('player MovimentL', pos)
    })
})





//Servidor
    server.listen(3000, () => {
        console.log('✅ - Servidor iniciado na porta 3000!')
    })