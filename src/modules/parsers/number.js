import { space } from './space.js'
import { numRe } from '../regex/rgx.js'

export const number = str => {
  let match
  space(str) ? (str = space(str)[1]) : str
  return (
    (match = str.match(numRe)),
    match ? [parseFloat(match[0]), str.slice(match[0].length)] : null
  )
}
