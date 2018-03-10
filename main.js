const parseJson = json => {
  console.log('Parsed value', valueParser(json))
}

const nullParser = str => {
  return str.startsWith('null') ? [null, str.slice(4)] : null
}

const booleanParser = str => {
  return str.startsWith('false')
    ? [false, str.slice(5)]
    : str.startsWith('true') ? [true, str.slice(4)] : null
}

const numberParser = str => {
  return (
    (match = str.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/)),
    match ? [parseFloat(match[0]), str.slice(match[0].length)] : null
  )
}

const stringParser = str => {
  return str.startsWith('"')
    ? ((match = str.match(/("([^"]|"")*")/)),
      match[0] != undefined
        ? /[\n|"']/.test(match[0].slice(1, -1))
          ? null
          : [match[0].replace(/"/g, ''), str.replace(match[0], '')]
        : null)
    : null
}

const commaParser = str => {
  return str.startsWith(',')
    ? ((match = str.match(/^,/)), match ? [match[0], str.slice(1)] : null)
    : null
}

const spaceParser = str => {
  return str.startsWith(' ')
    ? ((spaceLength = str.match(/^\s*/)[0].length),
      spaceLength > 0
        ? [str.slice(0, spaceLength), str.slice(spaceLength)]
        : null)
    : null
}
const colonParser = str => {
  return (match = str.match(/^:/)), match ? [match, str.replace(re, '')] : null
}

const arrayParser = str => {
  if (str[0] !== '[' && str[0] === ']') return null
  let array = []
  str = str.slice(1)
  while (str[0] !== ']') {
    spaceParser(str) ? (str = spaceParser(str)[1]) : str
    const factoryOutput = valueParser(str)
    factoryOutput != null
      ? (array.push(factoryOutput[0]),
        (str = factoryOutput[1]),
        commaParser(factoryOutput[1])
          ? (str = commaParser(factoryOutput[1])[1])
          : str,
        spaceParser(str) ? (str = spaceParser(str)[1]) : str)
      : null

    if (str === ']') return array
  }
  return [array, str.slice(1)]
}
const objectParser = () => {
  return null
}

const parsers = [
  nullParser,
  booleanParser,
  numberParser,
  stringParser,
  arrayParser,
  objectParser
]

const factoryParser = p => {
  return function(text) {
    if (text === null) return null
    let out
    for (let i = 0; i < p.length; i++) {
      out = p[i](text)
      if (out != null) {
        return out
      }
    }
    return null
  }
}

let valueParser = factoryParser(parsers)
parseJson(contents)

import { contents } from './src/fileReader.js';
import * as parsers from './src/parsers.js';


