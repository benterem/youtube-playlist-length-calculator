const puppeteer = require('puppeteer');

async function scrapePlaylist (url) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.evaluate(() => {

  });
}