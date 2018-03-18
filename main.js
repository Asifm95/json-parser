let fs = require('fs')
let contents = fs.readFileSync('input.json', 'utf8')

const factory = p => {
  return text => {
    if (text === null) return null
    let out
    const keys = Object.keys(p)
    for (let i = 0; i < keys.length; i++) {
      try {
        out = p[keys[i]](text)
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

const colonRe = /^:/
const commaRe = /^,/
const numRe = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/
const commaErrRe = /\,(?!\s*[\{\"\w])/g
const spaceRe = /^\s+|\s+$/
const stringRe = /^"(?:\\"|.)*?"/
const regexTable = {
  '/\\\\/': '\\',
  '/\\//': '/',
  '/\\b/': '\b',
  '/\\f/': '\f',
  '/\\n/': '\n',
  '/\\r/': '\r',
  '/\\t/': '\t'
}
const validateRe = /[^ | \n]+$/
const isValidNum = /^-?(0|[1-9]\d*|(?=\.))(\.\d+)?$/

const space = str => {
  let match
  return (str && str.startsWith(' ')) || (str && str.startsWith('\n'))
    ? ((match = str.match(spaceRe)),
      match ? [match[0], str.replace(spaceRe, '')] : null)
    : null
}

const nullx = str => {
  space(str) ? (str = space(str)[1]) : str
  return str && str.startsWith('null') ? [null, str.slice(4)] : null
}

const boolean = str => {
  return str != undefined && str.startsWith('false')
    ? [false, str.slice(5)]
    : str && str.startsWith('true') ? [true, str.slice(4)] : null
}

const syntaxCheck1 = str => {
  if (str.match(commaErrRe)) {
    console.log(`\x1b[31m${'Message: Property expected'}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
}

const syntaxCheck2 = str => {
  if (!str.startsWith('"'))
    throw SyntaxError(`\x1b[31m${'Invalid JSON'}\x1b[0m`)
}
const syntaxCheck3 = str => {
  if (!str.startsWith(':')) {
    console.log(`\x1b[31m${'Message: Expected colon'}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
  return str
}

const syntaxCheck4 = value => {
  if (value === null) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      'Message: Must contain a value after colon'
    )
    throw SyntaxError('Invalid JSON')
  }
}
const commaCheck = str => {
  if (isFinite(str[0]) && str[1] === ' ') {
    console.log('\x1b[31m%s\x1b[0m', 'Message: Expected comma')
    throw SyntaxError('Invalid JSON')
  }
}
const trailCheck = str => {
  if (str[0] === ',') {
    space(str.slice(1)) ? (str = space(str.slice(1))[1]) : str
    if (str[0] === ']') {
      console.log('\x1b[31m%s\x1b[0m', 'Message: Trailing comma')
      throw SyntaxError('Invalid JSON')
    }
  }
  return str
}
const numValidCheck = num => {
  if (!isValidNum.test(num)) {
    let message = `Message: '${num} 'is not a valid number.`
    console.log(`\x1b[31m${message}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
}
const numSyntaxCheck = str => {
  if (str.startsWith('.')) {
    let message = `Message: Value expected before dot`
    console.log(`\x1b[31m${message}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
}

const number = str => {
  numSyntaxCheck(str)
  space(str) ? (str = space(str)[1]) : str
  let match = str.match(numRe)

  if (match && match[0].includes('.')) {
    numValidCheck(match[0])
  }
  if (match) {
    return [parseFloat(match[0]), str.slice(match[0].length)]
  }
  return null
}

const stringx = str => {
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

const comma = str => {
  let match
  return str && str.startsWith(',')
    ? ((match = str.match(commaRe)), match ? [match[0], str.slice(1)] : null)
    : null
}

const array = str => {
  space(str) ? (str = space(str)[1]) : str
  if (str != undefined && !str.startsWith('[')) {
    return null
  }
  let array = []
  str = str.slice(1)
  while (str[0] !== ']') {
    space(str) ? (str = space(str)[1]) : str
    commaCheck(str)
    const factoryOut = valueParser(str)
    if (factoryOut) {
      array.push(factoryOut[0])
      str = factoryOut[1]
      str = trailCheck(str)
      comma(factoryOut[1]) ? (str = comma(factoryOut[1])[1]) : str
      space(str) ? (str = space(str)[1]) : str
    }
    if (!str.includes(']')) throw Error('Expected comma or closing brace')
    if (str === ']') return [array, str.slice(1)]
  }
  return [array, str.slice(1)]
}

const colon = str => {
  let match
  return (match = str.match(colonRe)), match ? [match, str.slice(1)] : null
}

const object = str => {
  space(str) ? (str = space(str)[1]) : str
  if (str[0] !== '{') return null
  syntaxCheck1(str)
  let object = {}
  str = str.slice(1)
  space(str) ? (str = space(str)[1]) : str
  while (str[0] != '}') {
    space(str) ? (str = space(str)[1]) : str
    syntaxCheck2(str)
    let factory
    try {
      factory = stringx(str)
    } catch (error) {}
    space(str) ? (str = space(str)[1]) : str
    factory[1] = syntaxCheck3(factory[1])
    if (factory) {
      let key = factory[0]
      if (factory[1]) {
        str = factory[1]
        colon(str) ? (str = colon(str)[1]) : str
        space(str) ? (str = space(str)[1]) : str
        syntaxCheck4(valueParser(str))
        let value = valueParser(str)
        object[key] = value[0]
        str = value[1]
        comma(str) ? (str = comma(str)[1]) : str
        space(str) ? (str = space(str)[1]) : str
      }
    }
    if (str === '}') break
  }
  return [object, str.slice(1)]
}

const parsers = [nullx, boolean, number, stringx, array, object]
const valueParser = factory(parsers)

console.time()
const result = valueParser(contents)
console.timeEnd()
if (result.length !== 2) {
  console.log(result)
}

if (result) {
  const test = validateRe.test(result[1])
  test
    ? console.log(`\x1b[31m${'Invalid JSON'}\x1b[0m`)
    : console.log('\x1b[32m%s\x1b[0m', JSON.stringify(result[0], true, 2))
}
