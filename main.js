let fs = require('fs')
let contents = fs.readFileSync('input.json', 'utf8')

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
    let whiteCatcher = spaceParser(str)
    if (whiteCatcher) str = whiteCatcher[1]
    let factoryOutput = valueParser(str)
    if (factoryOutput != null) {
      array.push(factoryOutput[0])
      str = factoryOutput[1]
      commaEliminator = commaParser(factoryOutput[1])
      if (commaEliminator && commaEliminator[1]) {
        str = commaEliminator[1]
      }
      whiteCatcher = spaceParser(str)
      if (whiteCatcher) str = whiteCatcher[1]
    }
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
// console.log(commaParser(',"hello"'));
