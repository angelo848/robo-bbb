const puppeteer = require('puppeteer')
const CaptchaSolver = require('captcha-solver')
const VOTING_URL = 'https://gshow.globo.com/realities/bbb/bbb21/votacao/paredao-bbb21-vote-para-eliminar-arthur-gilberto-ou-karol-conka-838ec4d5-7d17-4263-a335-29e13c3a769b.ghtml'
const DIVS_SELECTOR = '#roulette-root > div > div div:nth-child(4) > div > div'
const NAME_SELECTOR = '> div > div > div > div > div > div > div'

const bot = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
  const page = await browser.newPage();
  page.setViewport({
    width: 800,
    height: 1000
  })
  await page.goto(VOTING_URL, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForSelector(DIVS_SELECTOR)
  const selectedParticipant = await page.$$eval(DIVS_SELECTOR, async (elements) => {
    return elements.filter(element => {
      const IMAGESRC = "https://s2.glbimg.com/VgrPNyV0OQz2HAFSPVBXOC1g6Ek=/0x0:650x650/648x0/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/y/y/IuCvs3TkCCl8BAK9iLqQ/karol-conka.jpg"
      const position = getComputedStyle(element).getPropertyValue('position')
      const display = getComputedStyle(element).getPropertyValue('display')
      const minWith = getComputedStyle(element).minWidth
      const imgSrc = element.querySelector('img').src
      if ((display === 'block') && (position === 'static') && (minWith === 'auto') && (imgSrc === IMAGESRC)) {
        return true
      }
      return false
    })
      .map(element => element.className)
  })

  const name = await page.$(`.${selectedParticipant[0]} ${NAME_SELECTOR}`)
  await name.click()
  await page.waitForTimeout(500)

  // LOGIN SITE DA GLOBO
  const loginInput = await page.$('div.cadun-modal iframe input#login')
  const loginPassword = await page.$('input#password')
  const button = await page.$('div.actions button.button')

  await loginInput.type('santospri267@gmail.com')
  await loginPassword.type('Pri123..face')
  await button.click()

  await page.waitForTimeout(500)

  // const solver = new CaptchaSolver('browser')
  // const codes = await solver.solve()
}

// setInterval(() => {
//   bot()
// }, 2000);

bot()