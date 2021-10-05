const playlistRouter = require('express').Router()
const url = 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6'

playlistRouter.get('/length'), (request, response) => {
  scrapePlaylist(url)
    .then(data => response.send(data))
    .catch(e => response.status(404).end())
}

module.exports = playlistRouter