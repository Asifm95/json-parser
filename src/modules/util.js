import { serializeRe } from './regex/rgx.js'

export const serializer = str => {
  return str.replace(serializeRe, '')
}
