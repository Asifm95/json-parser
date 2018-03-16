import { stringRe, regexTable } from '../regex/rgx.js'

export const stringx = str => {
  let match
  return str.startsWith('"')
    ? ((match = str.match(stringRe)),
      match && match[0] != undefined
        ? [stringEnhancer(match[0]), str.replace(match[0], '')]
        : SyntaxError('Syntax Error'))
    : null
}
const stringEnhancer = str => {
  str = str.slice(1, -1)
  for (const key in regexTable) {
    str = str.replace(new RegExp(key, 'g'), regexTable[key])
  }
  return str
}
