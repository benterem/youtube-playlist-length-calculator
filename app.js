const express = require('express')
const app = express()
const cors = require('cors')
const playlistRouter = require('./controllers/playlist')
// const middleware = require('./utils/')
const logger = require('./utils/logger')

app.use(cors)
app.use(express.static('build'))
app.use(express.json())

app.use('/api/playlists')


module.exports = app