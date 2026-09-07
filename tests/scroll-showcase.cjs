const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const assert = require('node:assert/strict')

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const [width, height, theme] of [[1366, 900, 'dark'], [390, 844, 'light']]) {
      await page.setViewportSize({ width, height })
      await page.goto('http://127.0.0.1:5175', { waitUntil: 'domcontentloaded' })
      await page.evaluate(theme => document.documentElement.classList.toggle('dark', theme === 'dark'), theme)
      await page.locator('.showcase-project').first().waitFor({ state: 'attached' })
      const move = async progress => {
        await page.locator('.scroll-showcase').evaluate((el, progress) => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top + (el.offsetHeight - innerHeight) * progress, behavior: 'instant' }), progress)
        await page.waitForTimeout(350)
        return page.locator('.showcase-track').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41)
      }
      const start = await move(0)
      const middle = await move(.5)
      assert.ok(middle < start - 100, 'downward scroll moves projects left')
      await page.screenshot({ path: `artifacts/showcase-${theme}.png` })
      const end = await move(1)
      assert.ok(end < middle - 100)
      const reverse = await move(.25)
      assert.ok(reverse > middle, 'upward scroll reverses direction')
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      assert.equal(await page.locator('.showcase-project img').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0)), true)
    }
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.locator('.showcase-static').waitFor({ state: 'attached' })
    assert.equal(await page.locator('.showcase-viewport').evaluate(el => getComputedStyle(el).overflowX), 'auto')
    assert.deepEqual(errors, [])
    console.log('PASS: scroll in both directions, desktop/mobile, themes, images, overflow, reduced motion')
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
