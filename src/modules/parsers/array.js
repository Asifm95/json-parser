import { valueParser } from '../parsers.js'
import { space } from './space.js'
import { comma } from './comma.js'

export const array = str => {
  if (str != undefined && !str.startsWith('[')) {
    return null
  }
  let array = []
  str = str.slice(1)
  space(str) ? (str = space(str)[1]) : str
  while (str[0] !== ']') {
    if (typeof str[0] === 'number' && str[1] === ' ') {
      throw Error('Expected comma')
    }
    const factoryOut = valueParser(str)
    factoryOut != null
      ? (array.push(factoryOut[0]),
        (str = factoryOut[1]),
        comma(factoryOut[1]) ? (str = comma(factoryOut[1])[1]) : str,
        space(str) ? (str = space(str)[1]) : str)
      : null

    if (str === ']') return [array, str.slice(1)]
  }
  return [array, str.slice(1)]
}
