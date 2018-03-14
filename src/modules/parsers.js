import { factoryParser } from './factoryParser.js'
import { colonParser, commaParser, spaceParser } from './subParsers.js'
import { arrayParser } from './arrayParser.js'

const nullParser = str => {
  return str && str.startsWith('null') ? [null, str.slice(4)] : null
}

const booleanParser = str => {
  return str != undefined && str.startsWith('false')
    ? [false, str.slice(5)]
    : str && str.startsWith('true') ? [true, str.slice(4)] : null
}

const numberParser = str => {
  spaceParser(str) ? (str = spaceParser(str)[1]) : str
  return (
    (match = str.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/)),
    match ? [parseFloat(match[0]), str.slice(match[0].length)] : null
  )
}

const stringParser = str => {
  return str.startsWith('"')
    ? ((match = str.match(/^"(?:\\"|.)*?"/)),
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
const regexTable = {
  '/\\\\/': '\\',
  '/\\//': '/',
  '/\\b/': '\b',
  '/\\f/': '\f',
  '/\\n/': '\n',
  '/\\r/': '\r',
  '/\\t/': '\t'
}

const objectParser = str => {
  if (str[0] !== '{') return null
  // if (str.match(/\,(?!\s*[\{\"\w])/g)) {
  //   throw SyntaxError('Invalid JSON')
  // }
  let object = {}
  str = str.slice(1)
  if (str.startsWith(' ') || str.startsWith('\n') || str.startsWith('\t')) {
    spaceParser(str) ? (str = spaceParser(str)[1]) : str
  }
  while (str[0] != '}') {
    str.startsWith(' ') && spaceParser(str) ? (str = spaceParser(str)[1]) : str
    factoryOutput = stringParser(str)

    if (factoryOutput) {
      let key = factoryOutput[0]
      if (factoryOutput[1]) {
        str = factoryOutput[1]
        str.startsWith(' ') && spaceParser(str)
          ? (str = spaceParser(str)[1])
          : str
        colonParser(str) ? (str = colonParser(str)[1]) : str
        str.startsWith(' ') && spaceParser(str)
          ? (str = spaceParser(str)[1])
          : str
        let value = valueParser(str)
        object[key] = value[0]
        str = value[1]
        commaParser(str) ? (str = commaParser(str)[1]) : str
      }
    }
    if (str === '}') break
  }
  return [object, str.slice(1)]
}

export const parsers = {
  nullParser,
  booleanParser,
  numberParser,
  stringParser,
  arrayParser,
  objectParser
}
export const valueParser = factoryParser(parsers)
