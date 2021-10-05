const express = require('express')
const app = express()
const http = require('http')
const logger = require('logger')
const scrapePlaylist = require('./scrapers')

const server = http.createServer(app)

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT} woof woof`))