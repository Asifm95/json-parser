import { data } from './src/modules/fileReader.js'
import { valueParser } from './src/modules/parsers.js'
import { validateRe } from './src/modules/regex/rgx.js'

console.time()
const result = valueParser(data)
console.timeEnd()
if (result) {
  const test = validateRe.test(result[1])
  test
    ? console.log('Invalid JSON')
    : console.log(JSON.stringify(result[0], true, 10))
}
