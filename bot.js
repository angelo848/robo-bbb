const puppeteer = require('puppeteer')
const VOTING_URL = 'https://gshow.globo.com/realities/bbb/bbb21/votacao/paredao-bbb21-vote-para-eliminar-arthur-gilberto-ou-karol-conka-838ec4d5-7d17-4263-a335-29e13c3a769b.ghtml'
const DIVS_SELECTOR = '#roulette-root > div > div div:nth-child(4) > div > div'
const PICTURE = ' > div > div > div > div > div > div> div > div div:nth-child(2)'

const bot = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(VOTING_URL, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForSelector(DIVS_SELECTOR)
  const divs = await page.$$eval(DIVS_SELECTOR, elements => elements.map(element => getComputedStyle(element)))
  // const properties = await divs[0].getProperties();
  // const children = [];
  // for (const property of properties.values()) {
  //   const element = property.asElement();
  //   if (element) {
  //     console.log('adas')
  //     children.push(element);
  //   }
  // }
  // console.log(children)
  // await karolConkaSelector.click()

  // const captcha = await page.waitForSelector('#checkbox')
  // await captcha.click()

  const pictures = []
  for (const div of divs) {
    await page.waitForTimeout(200)
    // const element = await page.eval(body => {
    //   console.log(body)
    //   console.log(body)
    //   console.log(body)
    // })
    const picture = await page.$(`${div._remoteObject.description} picture`)
    console.log('div', div._remoteObject.description)
    console.log('picture', picture)
    const isVisible = await div.boundingBox()
    if (isVisible) {
      pictures.push(div)
    }
  }
  console.log(pictures)
  await browser.close();
}

// setInterval(() => {
//   bot()
// }, 2000);

bot()