const express = require('express')
const app = express()
const http = require('http')
const logger = require('logger')
const scrapePlaylist = require('./scrapers')

const server = http.createServer(app)



const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)
app.use(requestLogger)

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT} woof woof`))