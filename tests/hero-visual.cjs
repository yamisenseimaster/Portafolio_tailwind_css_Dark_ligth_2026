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
      await page.addInitScript(theme => { localStorage.setItem('theme', theme); localStorage.setItem('music-muted', 'true') }, theme)
      await page.goto('http://127.0.0.1:5175', { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.locator('.code-stage').evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
      await page.waitForTimeout(1600)
      await page.getByRole('button', { name: 'Repetir escritura', exact: true }).click({ force: true })
      const before = await page.locator('.code-lines').innerText()
      await page.waitForFunction(before => document.querySelector('.code-lines').innerText !== before, before)
      await page.getByRole('button', { name: 'Pausar animación', exact: true }).click({ force: true })
      const paused = await page.locator('.code-lines').innerText()
      await page.waitForTimeout(300)
      assert.equal(await page.locator('.code-lines').innerText(), paused, 'pause stops typing')
      await page.getByRole('button', { name: 'Repetir escritura', exact: true }).click({ force: true })
      assert.ok((await page.locator('.code-lines').innerText()).length < paused.length, 'replay resets typing')
      const overflow = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth > innerWidth,
        lines: [...document.querySelectorAll('.code-line')].some(line => line.scrollWidth > line.clientWidth),
      }))
      assert.deepEqual(overflow, { document: false, lines: false })
      await page.screenshot({ path: `artifacts/hero-${theme}.png` })
    }
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.locator('.code-lines').waitFor()
    assert.ok((await page.locator('.code-lines').innerText()).includes('export default Yamil'))
    assert.equal(await page.getByRole('button', { name: 'Pausar animación', exact: true }).isDisabled(), true)
    assert.deepEqual(errors, [])
    console.log('PASS: desktop/mobile, dark/light, typing, pause, replay, reduced motion, no overflow or browser errors')
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
