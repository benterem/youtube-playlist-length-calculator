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
      response.status(404).send({error: 'Try a different url'})
    })
})

playlistRouter.get('/urls', (request, response) => {
  const playlistUrls = request.body.urls 
  const playlistsData = playlistUrls.map(u => scrapePlaylist(u))

  playlistsData
    .then(data => {
      response.json(data)
    })
    .catch(e => {
      response.status(404).send({error: 'At least one of the URLs didn\'t work'})
    })
})


module.exports = playlistRouter