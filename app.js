const express = require('express')
const app = express()
const cors = require('cors')
const playlistRouter = require('./controllers/playlist')
const middleware = require('./utils/middleware')

app.use(cors)
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/playlists', playlistRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app