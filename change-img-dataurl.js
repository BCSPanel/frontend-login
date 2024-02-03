import fs from 'fs'
import cheerio from 'cheerio'

console.log('reading dataurl')
const dataurl = 'data:image/png;base64,' + fs.readFileSync('public/img/BCSPanel.png').toString('base64')

console.log('reading index.html')
const read_indexhtml = fs.readFileSync('index.html').toString()

console.log('writing loading_applogo')
const $ = cheerio.load(read_indexhtml)
const img = $('img[id=loading_applogo]').attr()
img.src = dataurl
fs.writeFileSync('index.html', $.html())
