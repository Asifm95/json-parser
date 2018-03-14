import fs from 'fs'
import { serializer } from './util.js'

const reader = fs.readFileSync('./src/assets/input.json', 'utf8')
export const data = serializer(reader)
