import fs from 'fs'

const reader = fs.readFileSync('./src/assets/input.json', 'utf8')
export const data = reader.replace(/\s(?=("[^"]*"|[^"])*$)/gm, '')
