import { space } from './space.js'
import { stringx } from './string.js'
import { colon } from './colon.js'
import { comma } from './comma.js'
import { valueParser } from '../parsers.js'

import {
  syntaxCheck1,
  syntaxCheck2,
  syntaxCheck3,
  syntaxCheck4
} from '../exceptionHandlers/errors.js'

export const object = str => {
  space(str) ? (str = space(str)[1]) : str
  if (str[0] !== '{') return null
  syntaxCheck1(str)
  let object = {}
  str = str.slice(1)
  space(str) ? (str = space(str)[1]) : str
  while (str[0] != '}') {
    space(str) ? (str = space(str)[1]) : str
    syntaxCheck2(str)
    let factory
    try {
      factory = stringx(str)
    } catch (error) {
      console.log(error)
    }
    space(str) ? (str = space(str)[1]) : str
    factory[1] = syntaxCheck3(factory[1])
    if (factory) {
      let key = factory[0]
      if (factory[1]) {
        str = factory[1]
        colon(str) ? (str = colon(str)[1]) : str
        space(str) ? (str = space(str)[1]) : str
        syntaxCheck4(valueParser(str))
        let value = valueParser(str)
        object[key] = value[0]
        str = value[1]
        comma(str) ? (str = comma(str)[1]) : str
        space(str) ? (str = space(str)[1]) : str
      }
    }
    if (str === '}') break
  }
  return [object, str.slice(1)]
}
