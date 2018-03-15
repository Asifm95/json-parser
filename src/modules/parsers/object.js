import { space } from './space.js'
import { stringx } from './string.js'
import { colon } from './colon.js'
import { comma } from './comma.js'
import { valueParser } from '../parsers.js'
import { commaErrRe, validateRe } from '../regex/rgx.js'

export const object = str => {
  if (str[0] !== '{') return null
  if (str.match(commaErrRe)) {
    throw SyntaxError('Invalid JSON')
  }
  let object = {}
  str = str.slice(1)
  if (str.startsWith(' ') || str.startsWith('\n') || str.startsWith('\t')) {
    space(str) ? (str = space(str)[1]) : str
  }
  while (str[0] != '}') {
    space(str) ? (str = space(str)[1]) : str
    if (!str.startsWith('"'))
      throw new Error(`\x1b[31m${'Invalid JSON'}\x1b[0m`)

    let factory
    factory = stringx(str)
    if (factory) {
      let key = factory[0]
      if (factory[1]) {
        str = factory[1]
        space(str) ? (str = space(str)[1]) : str
        if (!str.startsWith(':')) {
          console.log('\x1b[31m%s\x1b[0m', 'Message: Expected colon')
          throw new Error('Invalid JSON')
        }
        colon(str) ? (str = colon(str)[1]) : str
        str.startsWith(' ') && space(str) ? (str = space(str)[1]) : str

        if (valueParser(str) === null) {
          console.log(
            '\x1b[31m%s\x1b[0m',
            'Message: Must contain a value after colon'
          )
          throw new Error('Invalid JSON')
        }
        let value = valueParser(str)
        object[key] = value[0]
        str = value[1]
        comma(str) ? (str = comma(str)[1]) : str
      }
    }
    if (str === '}') break
  }
  return [object, str.slice(1)]
}
