import { contents } from './src/modules/fileReader.js'
import { parsers } from './src/modules/parsers.js'

const factoryParser = p => {
  return function(text) {
    if (text === null) return null
    let out
    for (let i = 0; i < p.length; i++) {
      out = p[i](text)
      if (out != null) return out
    }
    return null
  }
}

let valueParser = factoryParser(parsers)
console.log(valueParser(contents))
