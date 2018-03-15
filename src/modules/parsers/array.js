import { valueParser } from '../parsers.js'
import { space } from './space.js'
import { comma } from './comma.js'

export const array = str => {
  space(str) ? (str = space(str)[1]) : str
  if (str != undefined && !str.startsWith('[')) {
    return null
  }
  let array = []
  str = str.slice(1)
  while (str[0] !== ']') {
    space(str) ? (str = space(str)[1]) : str
    if (isFinite(str[0]) && str[1] === ' ') {
      throw Error('Expected comma')
    }
    try {
      const factoryOut = valueParser(str)
    } catch (error) {
      console.log(error)
    }
    if (factoryOut) {
      array.push(factoryOut[0])
      str = factoryOut[1]
      if (str[0] === ',') {
        space(str) ? (str = space(str)[1]) : str
        if (str[1] === ']') {
          throw Error('Trailing comma')
        }
      }
      comma(factoryOut[1]) ? (str = comma(factoryOut[1])[1]) : str
      space(str) ? (str = space(str)[1]) : str
    }
    if (!str.includes(']')) throw Error('Expected comma or closing brace')
    if (str === ']') return [array, str.slice(1)]
  }
  return [array, str.slice(1)]
}
