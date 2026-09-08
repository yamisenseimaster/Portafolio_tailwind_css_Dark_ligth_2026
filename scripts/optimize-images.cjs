const path = require('node:path')
const fs = require('node:fs/promises')
const sharp = require(process.env.SHARP_MODULE || 'sharp')

async function main() {
  const directory = path.resolve(__dirname, '../src/assets/imgens')
  let before = 0
  let after = 0
  for (let index = 1; index <= 6; index++) {
    const input = path.join(directory, `proyecto${index}.png`)
    const output = path.join(directory, `proyecto${index}.webp`)
    before += (await fs.stat(input)).size
    await sharp(input).resize({ width: 1440, withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toFile(output)
    after += (await fs.stat(output)).size
  }
  console.log(JSON.stringify({ before, after, reduction: `${Math.round((1 - after / before) * 100)}%` }))
}
main().catch(error => { console.error(error); process.exitCode = 1 })
