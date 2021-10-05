const express = require('express')
const app = express()
const cors = require('cors')
const playlistRouter = require('./controllers/playlist')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(cors)
app.use(express.static('build'))
app.use(express.json())

app.use('/api/playlists')
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app