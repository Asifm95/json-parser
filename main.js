let fs = require('fs')
let contents = fs.readFileSync('input.json', 'utf8')

const parseJson = json => {
  const parsed = valueParser(json)
  if (parsed) {
    const test = /[^ ]+$/.test(parsed[1])
    test
      ? console.log('Invalid JSON')
      : console.log(JSON.stringify(parsed[0], true, 10))
  }
}

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

const commaParser = str => {
  return str && str.startsWith(',')
    ? ((match = str.match(/^,/)), match ? [match[0], str.slice(1)] : null)
    : null
}

const spaceParser = str => {
  return (str && str.startsWith(' ')) || (str && str.startsWith('\n'))
    ? ((match = str.match(/^\s+|\s+$/)),
      match && match[0] ? [match[0], str.replace(/^\s+|\s+$/, '')] : null)
    : null
}
const colonParser = str => {
  return (match = str.match(/^:/)), match ? [match, str.slice(1)] : null
}

const arrayParser = str => {
  if (str != undefined && !str.startsWith('[')) {
    return null
  }
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
      try {
        out = p[i](text)
      } catch (error) {
        console.log(error)
      }
      if (out != null) {
        return out
      }
    }
    return null
  }
}

let valueParser = factoryParser(parsers)
let serialize = contents.replace(/\s(?=("[^"]*"|[^"])*$)/gm, '')
parseJson(serialize)
// console.log(stringParser('hello'))
