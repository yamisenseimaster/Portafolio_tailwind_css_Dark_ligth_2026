const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const assert = require('node:assert/strict')

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.addInitScript(() => {
      if (!sessionStorage.getItem('palette-test-ready')) {
        localStorage.clear()
        sessionStorage.setItem('palette-test-ready', 'true')
      }
      localStorage.setItem('music-muted', 'true')
    })
    await page.goto('http://127.0.0.1:5175', { waitUntil: 'domcontentloaded' })
    await page.getByRole('button', { name: 'Abrir selector de colores' }).click()
    await page.getByRole('button', { name: 'Celeste', exact: true }).click()
    await page.waitForFunction(() => document.documentElement.dataset.palette === 'cyan')
    assert.equal(await page.evaluate(() => localStorage.getItem('color-palette')), 'cyan')
    await page.getByRole('button', { name: 'Cerrar panel' }).click()
    await page.reload({ waitUntil: 'domcontentloaded' })
    assert.equal(await page.locator('html').getAttribute('data-palette'), 'cyan')
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    assert.deepEqual(errors, [])
    await page.getByRole('button', { name: 'Abrir selector de colores' }).click()
    await page.waitForTimeout(450)
    await page.screenshot({ path: 'artifacts/color-palette-mobile.png', fullPage: false })
    console.log('PASS: panel, cambio de color, persistencia y vista movil')
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
