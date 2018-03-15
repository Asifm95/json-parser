export const colonRe = /^:/
export const commaRe = /^,/
export const numRe = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/
export const commaErrRe = /\,(?!\s*[\{\"\w])/g
export const spaceRe = /^\s+|\s+$/
export const stringRe = /^"(?:\\"|.)*?"/
export const regexTable = {
  '/\\\\/': '\\',
  '/\\//': '/',
  '/\\b/': '\b',
  '/\\f/': '\f',
  '/\\n/': '\n',
  '/\\r/': '\r',
  '/\\t/': '\t'
}
export const serializeRe = /\s(?=("[^"]*"|[^"])*$)/gm
export const validateRe = /[^ ]+$/
