const puppeteer = require('puppeteer');
async function searchGoogle(keyword) {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`

  await page.goto(searchUrl,{waitUntil: 'domcontentloaded'});
  await page.waitForSelector('.tF2Cxc');
  const links = await page.evaluate(()=>{
    results = [];
    const elements = document.querySelector('a h3');

    elements.forEach(el => {
      const parent = el.closest('a');
      if(parent){
        results.push({
          title: el.innerText,
          url: parent.href,
        })
      }
    });
    return results;
  })

  console.log("Top Google searches results: ");
  links.forEach((link, index) =>{
    console.log(`${index+1}.  ${link.title} -- ${link.url}`);
  })

  await browser.close();

}

searchGoogle("Jaipur food bloggers");