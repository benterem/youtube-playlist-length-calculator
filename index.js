const { response } = require('express');
const express = require('express')
const app = express()
const scrapePlaylist = require('./scrapers')

const url = 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6'

app.get('/api/playlists/length', (request, response) => {
  const urlLengthObject = scrapePlaylist(url).then(data => response.send(data));
  // response.json(urlLengthObject)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT} woof woof`))