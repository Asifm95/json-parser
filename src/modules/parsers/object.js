import { space } from './space.js'
import { stringx } from './string.js'
import { colon } from './colon.js'
import { comma } from './comma.js'
import { valueParser } from '../parsers.js'
import { commaErrRe } from '../regex/rgx.js'

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
    str.startsWith(' ') && space(str) ? (str = space(str)[1]) : str
    let factory
    factory = stringx(str)
    if (factory) {
      let key = factory[0]
      if (factory[1]) {
        str = factory[1]
        str.startsWith(' ') && space(str) ? (str = space(str)[1]) : str
        colon(str) ? (str = colon(str)[1]) : str
        str.startsWith(' ') && space(str) ? (str = space(str)[1]) : str
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
