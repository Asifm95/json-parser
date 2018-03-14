import { data } from './src/modules/fileReader.js'
import { valueParser } from './src/modules/parsers.js'

console.time()
const result = valueParser(data)
console.timeEnd()
console.log(JSON.stringify(result[0], true, 10))
