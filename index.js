const { response, request } = require('express');
const express = require('express')
const app = express()
const scrapePlaylist = require('./scrapers')

const url = 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6'

app.get('/api/playlists/length', (request, response) => {
  scrapePlaylist(url)
    .then(data => response.send(data))
    .catch(e => response.status(404).end())
})

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