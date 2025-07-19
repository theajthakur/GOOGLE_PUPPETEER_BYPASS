const puppeteer = require("puppeteer");
require("dotenv").config();

async function searchGoogle(keyword) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.ExecutablePath,
    userDataDir: process.env.USER_DATA,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(
    `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
    { waitUntil: "domcontentloaded" }
  );

  const headings = await page.evaluate(() => {
    const hs = [];
    for (let i = 1; i <= 6; i++) {
      document
        .querySelectorAll(`h${i}`)
        .forEach((h) => hs.push(h.innerText.trim()));
    }
    return hs;
  });

  console.log(headings);
  await browser.close();
}

(async () => {
  await searchGoogle("Food Vlogger");
})();
