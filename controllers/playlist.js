const playlistRouter = require('express').Router()
const scrapePlaylist = require('../scrapers')
const url = 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6'

playlistRouter.get('/', (request, response) => {
  console.log('sdfad')
  scrapePlaylist('https://www.youtube.com/watch?v=eal4-A89IWY&list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6')
    .then(data => response.send(data))
    .catch(e => {
      console.log('in catch') 
      response.status(404).end()
    })
})

module.exports = playlistRouter