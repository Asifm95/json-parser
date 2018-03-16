import { space } from './space.js'
import { numRe } from '../regex/rgx.js'
import { numValidCheck, numSyntaxCheck } from '../exceptionHandlers/errors.js'

export const number = str => {
  numSyntaxCheck(str)
  space(str) ? (str = space(str)[1]) : str
  let match = str.match(numRe)

  if (match && match[0].includes('.')) {
    numValidCheck(match[0])
  }
  if (match) {
    return [parseFloat(match[0]), str.slice(match[0].length)]
  }
  return null
}
