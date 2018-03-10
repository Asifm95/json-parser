import { factoryParser } from './factoryParser.js'
import { colonParser, commaParser, spaceParser } from './subParsers.js'
import { arrayParser } from './arrayParser.js'

const nullParser = str => {
  return str.startsWith('null') ? [null, str.slice(4)] : null
}

const booleanParser = str => {
  return str.startsWith('false')
    ? [false, str.slice(5)]
    : str.startsWith('true') ? [true, str.slice(4)] : null
}

const numberParser = str => {
  let match
  return (
    (match = str.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/)),
    match ? [parseFloat(match[0]), str.slice(match[0].length)] : null
  )
}

const stringParser = str => {
  let match
  return str.startsWith('"')
    ? ((match = str.match(/("([^"]|"")*")/)),
      match && match[0] != undefined
        ? /[\n|"']/.test(match[0].slice(1, -1))
          ? null
          : [match[0].replace(/"/g, ''), str.replace(match[0], '')]
        : null)
    : null
}
const objectParser = () => {
  return null
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
