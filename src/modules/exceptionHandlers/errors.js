import { commaErrRe } from '../regex/rgx.js'

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
export const syntaxCheck3 = factory => {
  if (!factory[1].startsWith(':')) {
    console.log(`\x1b[31m${'Message: Expected colon'}\x1b[0m`)
    throw SyntaxError('Invalid JSON')
  }
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
    throw Error('Expected comma')
  }
}
export const trailCheck = str => {
  if (str[0] === ',') {
    space(str) ? (str = space(str)[1]) : str
    if (str[1] === ']') {
      throw Error('Trailing comma')
    }
  }
}
