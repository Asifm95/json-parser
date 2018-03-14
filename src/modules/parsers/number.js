import { space } from './space.js'
export const number = str => {
  let match
  space(str) ? (str = space(str)[1]) : str
  return (
    (match = str.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/)),
    match ? [parseFloat(match[0]), str.slice(match[0].length)] : null
  )
}
