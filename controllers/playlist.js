const playlistRouter = require('express').Router()
const scrapePlaylist = require('../scrapers')

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