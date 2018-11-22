const express = require('express')
const app = express()
const port = process.env.Port || 3001

// const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
// app.use(morgan('dev'))
app.use(bodyParser.json())
let players = require('./players.json')

app.get('/players', (req, res) => {
    res.json({ players })
})

app.get('/players/:id', (req, res, next) => {
    const { id } = req.params
    const player = players.filter(player => player.id == id)
    if (player.length < 1) {
        next()
    }
    res.send({ data: player[0] })
})

app.put('/players', (req, res, next) => {
    let { id } = req.body
    let { body } = req
    let existingName = players.map(player => {
        if (player.id === id) {
            player = body
        }
        return player
    })
    players = existingName
    console.log({ players })
    res.send({ players })
})

app.post('/', (req, res, next) => {
    let newPlayer = req.body
    players.push(newPlayer)
    res.send(newPlayer)
})

const enemies = require('./enemies.json')

app.get('/enemies', (req, res) => {
    res.json({ enemies })
})

app.delete('/players/:id', (req, res) => {
    let { id } = req.params
    let newObj = players.filter(player => {
        return player.id != id
    })
    players = newObj
    res.send({ players })
})

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found.' })
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({ error: err })
})

const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)