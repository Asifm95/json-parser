import { data } from './src/modules/fileReader.js'
import { valueParser } from './src/modules/parsers.js'
import { validateRe } from './src/modules/regex/rgx.js'

console.time()
const result = valueParser(data)
console.timeEnd()
if (result.length !== 2) {
  console.log(result)
}

if (result) {
  const test = validateRe.test(result[1])
  test
    ? console.log(`\x1b[31m${'Invalid JSON'}\x1b[0m`)
    : console.log('\x1b[32m%s\x1b[0m', JSON.stringify(result[0], true, 2))
}
