import { valueParser } from '../parsers.js'
import { space } from './space.js'
import { comma } from './comma.js'
import { trailCheck, commaCheck } from '../exceptionHandlers/errors.js'

export const array = str => {
  space(str) ? (str = space(str)[1]) : str
  if (str != undefined && !str.startsWith('[')) {
    return null
  }
  let array = []
  str = str.slice(1)
  while (str[0] !== ']') {
    space(str) ? (str = space(str)[1]) : str
    commaCheck(str)
    const factoryOut = valueParser(str)
    if (factoryOut) {
      array.push(factoryOut[0])
      str = factoryOut[1]
      str = trailCheck(str)
      comma(factoryOut[1]) ? (str = comma(factoryOut[1])[1]) : str
      space(str) ? (str = space(str)[1]) : str
    }
    if (!str.includes(']')) throw Error('Expected comma or closing brace')
    if (str === ']') return [array, str.slice(1)]
  }
  return [array, str.slice(1)]
}
