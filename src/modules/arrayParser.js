import { spaceParser, commaParser } from './subParsers.js'
import { valueParser } from './parsers.js'

export const arrayParser = str => {
  if (str[0] !== '[') return null
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
