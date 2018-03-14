import { colonRe } from '../regex/rgx.js'

export const colon = str => {
  let match
  return (match = str.match(colonRe)), match ? [match, str.slice(1)] : null
}
