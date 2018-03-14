import { commaRe } from '../regex/rgx.js'

export const comma = str => {
  let match
  return str && str.startsWith(',')
    ? ((match = str.match(commaRe)), match ? [match[0], str.slice(1)] : null)
    : null
}
