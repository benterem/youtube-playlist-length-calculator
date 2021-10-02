const puppeteer = require('puppeteer');

const lengthFormated = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const mins = Math.floor((timeInSeconds % 3600) / 60);
  const secs = (timeInSeconds % 3600) % 60;
  return {hours, mins, secs}
}

async function scrapePlaylist (url) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  await page.screenshot({path: 'screenshot.png'});
  
  const spans = await page.$x('//span[@class="style-scope ytd-thumbnail-overlay-time-status-renderer"]');

  const srcs = await Promise.all(spans.map(async span => await span.getProperty('innerText')));
  const timeStamps = await Promise.all(srcs.map(async src => await src.jsonValue()));

  const totalTimeInSeconds = timeStamps.reduce((a, c) => {
    let timeArray = c.split(':');
    return a + parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
  }, 0);

  console.log(`There are ${timeStamps.length} videos in the playlist`);
  
  const lengthObject = lengthFormated(totalTimeInSeconds);

  //TODO: send back data to client
  console.log(`Total playlist length:\n${lengthObject.hours} hours, ${lengthObject.mins} minutes, ${lengthObject.secs} seconds`);
  console.log(`Approximately ${Math.floor(totalTimeInSeconds / 60)} minutes`);
  console.log(`Go to the playlist ${url}`)

  console.log(totalTimeInSeconds);



  browser.close();
}


//TODO: Recieve data from endpoints
scrapePlaylist('https://www.youtube.com/playlist?list=PLIhvC56v63IJIujb5cyE13oLuyORZpdkL');