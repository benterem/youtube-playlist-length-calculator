const puppeteer = require('puppeteer');


async function scrapePlaylist (url) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.screenshot({path: 'video_or_playlist_page.png'})

  //if url given is of single video, go to playlist page
  if(url.search('playlist') === -1){
    const [a_tag] = await page.$x("//a[starts-with(@href, '/playlist')]")
    const url_object = await a_tag.getProperty('href')
    const url = await url_object.jsonValue()

    await page.goto(url)
    await page.screenshot({path: 'playlist_page.png'})
  }

  const spans = await page.$x('//span[@class="style-scope ytd-thumbnail-overlay-time-status-renderer"]');

  const srcs = await Promise.all(spans.map(async span => await span.getProperty('innerText')));
  const timeStamps = await Promise.all(srcs.map(async src => await src.jsonValue()));

  const totalTimeInSeconds = timeStamps.reduce((a, c) => {
    let timeArray = c.split(':');
    if(timeArray.length === 3){
      return a + parseInt(timeArray[0]) * 3600 + parseInt(timeArray[1]) * 60 + parseInt(timeArray[2]);
    }else {
      return a + parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    }
  }, 0);
  
  browser.close();

  playlistData = {
    totalLengthInSeconds: totalTimeInSeconds,
    approximateTimeInMinutes : Math.floor(totalTimeInSeconds / 60),
    approximateTimeInHours: Math.floor(totalTimeInSeconds / 3600),
    numberOfVideos: timeStamps.length
  }
  
  return playlistData
}


module.exports = scrapePlaylist