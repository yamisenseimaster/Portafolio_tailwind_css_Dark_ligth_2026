const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const assert = require('node:assert/strict')

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    const page = await browser.newPage()
    await page.addInitScript(() => localStorage.setItem('music-muted', 'true'))
    for (const width of [1366, 390]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('http://127.0.0.1:5175', { waitUntil: 'domcontentloaded' })
      const figures = page.locator('.project-perspective')
      await figures.first().waitFor({ state: 'attached' })
      assert.equal(await figures.count(), 6)
      for (let index = 0; index < 6; index++) {
        const figure = figures.nth(index)
        await figure.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
        await page.waitForFunction(index => {
          const figure = document.querySelectorAll('.project-perspective')[index]
          const image = figure.querySelector('img')
          const clip = getComputedStyle(figure.firstElementChild).clipPath
          return image.complete && image.naturalWidth > 0 && /^inset\(0(?:%|px)?\)$/.test(clip)
        }, index, { timeout: 10000 })
      }
      console.log('PASS: all six project images load and reveal at width ' + width)
    }
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
