const puppeteer = require('puppeteer');


async function scrapePlaylist (url) {

  console.log('in scraper')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  await page.screenshot({path: 'screenshot.png'});

  setTimeout( async () => {

    const spans = await page.$x('//span[@class="style-scope ytd-thumbnail-overlay-time-status-renderer"]');

    const srcs = await Promise.all(spans.map(async span => await span.getProperty('innerText')));
    const timeStamps = await Promise.all(srcs.map(async src => await src.jsonValue()));

    const totalTimeInSeconds = timeStamps.reduce((a, c) => {
      let timeArray = c.split(':');
      return a + parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    }, 0);

    console.log(`There are ${timeStamps.length} videos in the playlist`);
    
    browser.close();

    return {
      totalLengthInSeconds: totalTimeInSeconds,
      approximateTimeInMinutes : Math.floor(totalTimeInSeconds / 60)
    }
  }, 2000)
}


module.exports = scrapePlaylist