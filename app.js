const express = require('express')
const app = express()
const port = process.env.Port || 3001

// const morgan = require('morgan')
// const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
// app.use(morgan('dev'))
// app.use(bodyParser.json())
const player = require('./player.json')

app.get('/player', (req, res) => {
    res.json({ player })
})

const enemies = require('./enemies.json')

app.get('/enemies', (req, res) => {
    res.json({ enemies })
})

// app.use((err, req, res, next) => {
//     const status = err.status || 500
//     res.status(status).json({ error: err })
// })

// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Not found.' })
// })

const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)