import { commaErrRe, isValidNum } from '../regex/rgx.js'
import { space } from '../parsers/space.js'

export const syntaxCheck1 = str => {
  if (str.match(commaErrRe)) {
    console.log(`\x1b[31m${'Message: Property expected'}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
}

export const syntaxCheck2 = str => {
  if (!str.startsWith('"'))
    throw SyntaxError(`\x1b[31m${'Invalid JSON'}\x1b[0m`)
}
export const syntaxCheck3 = str => {
  if (!str.startsWith(':')) {
    console.log(`\x1b[31m${'Message: Expected colon'}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
  return str
}

export const syntaxCheck4 = value => {
  if (value === null) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      'Message: Must contain a value after colon'
    )
    throw SyntaxError('Invalid JSON')
  }
}
export const commaCheck = str => {
  if (isFinite(str[0]) && str[1] === ' ') {
    console.log('\x1b[31m%s\x1b[0m', 'Message: Expected comma')
    throw SyntaxError('Invalid JSON')
  }
}
export const trailCheck = str => {
  if (str[0] === ',') {
    space(str.slice(1)) ? (str = space(str.slice(1))[1]) : str
    if (str[0] === ']') {
      console.log('\x1b[31m%s\x1b[0m', 'Message: Trailing comma')
      throw SyntaxError('Invalid JSON')
    }
  }
  return str
}
export const numValidCheck = num => {
  if (!isValidNum.test(num)) {
    let message = `Message: '${num} 'is not a valid number.`
    console.log(`\x1b[31m${message}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
}
export const numSyntaxCheck = str => {
  if (str.startsWith('.')) {
    let message = `Message: Value expected before dot`
    console.log(`\x1b[31m${message}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
}
