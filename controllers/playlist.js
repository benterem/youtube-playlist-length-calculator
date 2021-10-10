const playlistRouter = require('express').Router()
const scrapePlaylist = require('../scrapers')
const url = 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6'

playlistRouter.get('/', (request, response) => {
  
  const playlistUrl = request.body.url

  const playlistData = scrapePlaylist(playlistUrl)
  
  playlistData
    .then(data => {
      response.json(data)
    })
    .catch(e => {
      response.status(404).end()
    })
})


module.exports = playlistRouter