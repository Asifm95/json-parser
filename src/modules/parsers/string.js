import { stringRe, regexTable } from '../regex/rgx.js'

export const stringx = str => {
  let match
  return str.startsWith('"')
    ? ((match = str.match(stringRe)),
      match[0] != undefined
        ? [stringEnhancer(match[0].slice(1, -1)), str.replace(match[0], '')]
        : null)
    : null
}
const stringEnhancer = str => {
  for (const key in regexTable) {
    str = str.replace(new RegExp(key, 'g'), regexTable[key])
  }
  return str
}
